import { useEffect, useState } from "react";
import { useApp } from "../AppProvider";
import { dateShortHand, getTime, printDate } from "../lib/indexing";
import { H1, H2, H3 } from "./components/Headers";
import Query from "./components/Query";
import AnalogClock from "./components/viz/AnalogClock";
import {trash} from '../img/images';

function RemoveEntryModal ({entry, resolve, reject}) {
  const app = useApp ();
  const handleYes = async () => {
    try {
      await app.journal.hideEntry (entry.id);
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

function JournalCard ({idx}) {
  const {setModal, closeModal} = useApp ();
  const [open, setOpen] = useState ('');
  const openRemoveModal = entry => new Promise (async (resolve, reject) => {
    setModal (
      <RemoveEntryModal entry={entry} resolve={resolve} reject={reject} />
    )
  });
  const remove = entry => async () => {
    try {
      await openRemoveModal (entry);
    } finally {
      closeModal ();
    }
  }
  return (
    <article className={open}>
      <header onClick={() => {setOpen (open === '' ? 'open' : '')}}>
        <H2 short={dateShortHand (idx.list [0].start)}>{idx.meta.date}</H2>
        <ol>
          {
            idx.list.map (entry => (
              <li>
                <AnalogClock date={entry.start} />
              </li>
            ))
          }
        </ol>
      </header>
      {
        idx.list.map (entry => (
          <section>
            <header>
              <span />
              <H3 short={getTime (entry.start)}>
                {getTime (entry.start)} - {getTime (entry.end)}
              </H3>
              <span onClick={remove (entry)}><img src={trash} /></span>
            </header>
            {
              (entry.entryType === 'questions' || !entry.entryType) &&
              entry.questions.map ((q, i) => (
                <p key={`${entry.id}-question-${i}`}>
                  <b>{q}</b>
                  <br />
                  {entry.answers [i]}
                </p>
              ))
            }
            {
              entry.entryType === 'freeform' &&
              <p>{entry.freeform}</p>
            }
            {
              entry.entryType === 'audio' &&
                <figure>
                  <figcaption><p>{entry.audio.title}</p></figcaption>
                  <audio controls src={entry.audio.url} />
                </figure>
            }
          </section>
        ))
      }
    </article>
  )
}

export default function Journal () {
  const {auth: {user}, router: {page}, journal: {entries, clearSearch}} = useApp ();

  useEffect (() => {
    if (page !== 'journal') clearSearch ();
  }, [page]);

  if (!user || page !== 'journal') return null;
  return (
    <main className="view-journal">
      <H1>Journal</H1>
      <Query />
      {
        entries.map (idx => (
          <JournalCard idx={idx} />
        ))
      }
    </main>
  )

}