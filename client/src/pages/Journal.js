import { useEffect, useState } from 'react'
import {H1, H2, H3} from './components/Headers'
import Deferred from './components/Deferred';
import {getTime, printDate} from '../lib/indexing';
import {runScroll} from '../lib/scrolling';
import MinusSVG from '../img/minus.svg'
import TrashSVG from '../img/trash.svg'
import CancelSVG from '../img/cancel.svg'
import { useApp } from '../AppProvider';
import Query from './components/Query';
import AnalogClock from './components/viz/AnalogClock';

const defaultShowCount = 10;

function RemoveEntryModal ({entry, resolve, reject, hideEntry}) {
  const handleYes = async () => {
    try {
      await hideEntry (entry.id);
      resolve ();
    } catch (e) {
      reject ('Couldn\'t  successfully hide entry!')
    }
  }
  const handleNo = () => reject ('Cancelled');
  return (
    <div className="grid remove-entry-modal">
      <p>Are you sure you want to hide your journal entry from {printDate (entry.start)} at {getTime (entry.start)}</p>
      <div>
        <button onClick={handleYes}>Yes, hide it!</button>
        <button onClick={handleNo}>No, don't!</button>
      </div>
    </div>
  )
}

function EntryHeader ({entries, date, isOpen, open, close, count}) {
  return isOpen ? (
    <header className="entry-header" onClick={close}>
      <span className="fake-button"></span>
      <H2>{date}</H2>
    </header>
  ) : (
    <header className="entry-header" onClick={open}>
      <span>
        {
          entries.map (entry => (
            <AnalogClock date={entry.start} />
          ))
        }
      </span>
      <H2>{date}</H2>
      <div className="pill">
        <span>{count}</span>
      </div>
    </header>
  )
}

const EntryContents = ({entries, open}) => {
  const {journal: {hideEntry}, setModal, closeModal, viewMode: {isViewOnly}} = useApp ();
  return (
    <>
      {entries.map (entry => {
        const _openModal = async entry => new Promise (async (resolve, reject) => {
          setModal (<RemoveEntryModal entry={entry} resolve={resolve} reject={reject} hideEntry={hideEntry} />);
        })
        const openModal = entry => async () => {
          try {
            await _openModal (entry)
            closeModal ();
          } catch (e) {
            closeModal ();
          }
        }
        return open ? (
          <section className="journal-entry" key={`entry-${entry.id}`}>
            <header>
              <span></span>
              <H3 short={getTime (entry.start)}>
                {getTime (entry.start)} - {getTime (entry.end)}
              </H3>
              {
                !isViewOnly &&
                <span>
                  <img src={TrashSVG} onClick={openModal (entry)} />
                </span>
              }
            </header>
            {
              (entry.entryType === 'questions' || !entry.entryType) &&
              entry.questions.map ((q, i) => (
                <section key={`${entry.id}-question-${i}`}>
                  <p>
                    <b>{q} </b>
                    {entry.answers [i]}
                  </p>
                </section>
              ))
            }
            {
              entry.entryType === 'freeform' &&
              <section className="journal-entry">
                <p>{entry.freeform}</p>
              </section>
            }
            {
              entry.entryType === 'audio' &&
                <figure>
                  <figcaption><p>{entry.audio.title}</p></figcaption>
                  <audio controls src={entry.audio.url} />
                </figure>
            }
          </section>
        ) : null;
      })}
    </>
  )
}
function Journal() {
  const {router: {page}, journal: {entries, clearSearch, hideEntry}, freeze} = useApp ();
  const [open, setOpen] = useState ([]);
  const [showCount, setShowCount] = useState (defaultShowCount);
  const updateCount = () => {
    runScroll ();
    setShowCount (defaultShowCount + showCount);
  }
  const [removing, setRemoving] = useState ([]);
  const startRemoving = id => {
    if (removing.includes (id)) return remove (id);
    setRemoving (removing => [...removing, id]);
  }
  const cancelRemove = id => {
    setRemoving (removing => removing.filter (el => el !== id));
  }
  const shouldRemove = id => removing.includes (id);
  const remove = async id => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      if (!removing.includes (id)) return reject (new Error (`have not staged skill[${id}] for removal, cannot remove`));
      await hideEntry (id);
      setRemoving (removing => removing.filter (el => el !== id));
      unfreeze ();
      resolve ();
    } catch (e) {
      unfreeze ();
      reject (e);
    }
  })
  let removal = {startRemoving, cancelRemove, shouldRemove, remove}

  // clear search on unmount
  useEffect (() => {
    if (page !== 'journal') clearSearch ()
  }, [page])

  // body element
  let body = (
    <>
      {
        entries.filter ((d, i) => i < showCount).map ((index, i) => (
          <Deferred key={`deffered-index-search-results-${index.date}`} delay={i * 50} defferedClassName="">
            <div className={'article-wrapper' + (open.includes (index.date) ? ' open' : '')}>
              <article key={`index-search-results-${index.date}`}>
                <EntryHeader entries={index.list} count={index.list.length} date={index.meta.date} isOpen={open.indexOf (index.date) !== -1} open={() => {setOpen (open => [...open, index.date])}} close={() => {
                  setOpen (open => open.filter (d => d !== index.date))
                }} index={index} />
                <EntryContents open={open.indexOf (index.date) !== -1} entries={index.list} {...removal} />
              </article>
            </div>
          </Deferred>
        ))
      }
      {
        showCount < entries.length &&
        <div className="grid">
          <span onClick={updateCount} className="fake-button">Show More</span>
        </div>
      }
    </>
  );
  if (entries.length === 0) body = (
    <div className="grid">
      <span className="fake-button" onClick={clearSearch}>Clear Search Results</span>
      <H3>Hmmmm, nothing there!</H3>
    </div>
  );
  return (page !== 'journal') ? null : (
    <main>
      <H1>Journal</H1>
      <Query />
      {body}
    </main>
  )
}

export default Journal
