import { useEffect, useState } from 'react'
import {H2, H3} from './components/Headers'
import Search from './components/Search';
import Deferred from './components/Deferred';
import Filters from './components/Filters';
import {runIndexEntries, getTime} from '../lib/indexing';
import {runScroll} from '../lib/scrolling';
import constructFilterList from '../lib/filters';

const defaultShowCount = 10;

const EntryHeader = ({date, isOpen, open, close, count}) => {
  return isOpen ? (
    <header className="entry-header">
      <span className="fake-button" onClick={close}>close</span>
      <H2>{date}</H2>
    </header>
  ) : (
    <header className="entry-header">
      <span className="fake-button" onClick={open}>more</span>
      <H2>{date}</H2>
      <div className="pill">
        <span>{count}</span>
      </div>
    </header>
  )
}

const EntryContents = ({entries, open}) => entries.map (entry => {
  return open ? (
    <section className="journal-entry" key={`entry-${entry.id}`}>
      <H3 short={getTime (entry.start)}>
        {getTime (entry.start)} - {getTime (entry.end)}
      </H3>
      {
        (entry.entryType === 'questions' || !entry.entryType) &&
        entry.questions.map ((q, i) => (
          <section>
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
            <figcaption><p>{entry.audio.filename}</p></figcaption>
            <audio controls src={entry.audio.url} />
          </figure>
      }
    </section>
  ) : (<div></div>)
})

function Journal({display, entries, isNotMain}) {
  const [open, setOpen] = useState ([]);
  const [showCount, setShowCount] = useState (defaultShowCount);
  const [isSearching, setIsSearching] = useState (false);
  const [query, setQuery] = useState ('');
  const [searchResults, setSearchResults] = useState ([]);
  const [searchOnClear, setOnClear] = useState (()=>{});
  const [filterDialog, setFilterDialog] = useState (false);
  const [filterIteration, setFilterIteration] = useState (0);
  const iterate = a => setFilterIteration (filterIteration + 1);
  const [filters, _setFilter] = useState ([]);
  const setFilters = newFilters => {
    if (!isSearching) setIsSearching (true);
    _setFilter (newFilters);
    iterate ();
  }
  const updateSearch = q => {
    setIsSearching (true);
    setQuery (q);
  }
  const cancelSearch = () => {
    setIsSearching (false);
    if (searchOnClear) searchOnClear ();
    setSearchResults ([]);
  }
  const updateCount = () => {
    setShowCount (defaultShowCount + showCount);
  };
  useEffect (() => {
    if (showCount !== defaultShowCount) runScroll ();
  }, [showCount]);
  useEffect (() => {
    if (query.length || filterIteration > 0) runQuery (query);
  }, [query, filterIteration]);
  const runQuery = (q) => {
    // delay query until we know user isn't typing
    setTimeout (() => {
      // user was typing
      if (q !== query) return;
      let all = entries.reduce ((acc, val) => {
        return [...acc, ...val.list];
      }, []);
      all = constructFilterList (Object.values (filters)).reduce ((acc, val) => {
        return acc.filter (val);
      }, all);
      let freeformMatch = all.filter (entry => entry.entryType === 'freeform').filter (entry => entry.freeform.toLowerCase ().match (query.toLowerCase ()));
      let qaMatch = all.filter (entry => entry.entryType === 'questions').map (qa => {
        return Object.assign (qa, {combined: qa.answers.reduce ((acc, val) => {
          return acc + ' ' + val.toLowerCase ();
        }, '')});
      }).filter (qa => qa.combined.match (query.toLowerCase ()));
      let allMatch = [...qaMatch, ...freeformMatch];
      setSearchResults (runIndexEntries (allMatch));
    }, 500);
  }
  // what to render in the body
  let body = (
    <>
      {entries.map ((index, i) => i < showCount ? (
        <Deferred delay={(i % 10) * 85} defferedClassName={''}>
          <article key={`index-${index.date}`}>
            <EntryHeader count={index.list.length} date={index.meta.date} isOpen={open.indexOf (index.date) !== -1} open={() => {setOpen (open => [...open, index.date])}} close={() => {
              setOpen (open => open.filter (d => d !== index.date))
            }} index={index} />
            <EntryContents open={open.indexOf (index.date) !== -1} entries={index.list} />
          </article>
        </Deferred>
        ) : i === showCount ? (<div className="grid"><span className="fake-button" onClick={updateCount}>More...</span></div>) : (<div className="none"/>))
      }
    </>
  );
  // render if searching
  if (isSearching && searchResults.length > 0) body = (
    <>
      <div className="grid">
        <span className="fake-button" onClick={cancelSearch}>Clear Search Results</span>
      </div>
      {
        searchResults.map ((index, i) => (
          <Deferred delay={i * 50} defferedClassName="">
            <article key={`index-search-results-for-${query}-${index.date}`}>
              <EntryHeader count={index.list.length} date={index.meta.date} isOpen={open.indexOf (index.date) !== -1} open={() => {setOpen (open => [...open, index.date])}} close={() => {
                setOpen (open => open.filter (d => d !== index.date))
              }} index={index} />
              <EntryContents open={open.indexOf (index.date) !== -1} entries={index.list} />
            </article>
          </Deferred>
        ))
      }
    </>
  );
  if (isSearching && searchResults.length === 0) body = (
    <div className="grid">
      <span className="fake-button" onClick={cancelSearch}>Clear Search Results</span>
      <H3>Hmmmm, nothing there!</H3>
    </div>
  );
  return display ==='none' ? (<div/>) : isNotMain ? (
    <>
      <Search onClear={setOnClear} updateSearch={updateSearch} openFilter={()=>setFilterDialog (!filterDialog)} />
      <Filters iterate={iterate} open={filterDialog} setFilters={setFilters} filters={filters} />
      {body}
    </>
  )
  :
  (
    <main className={display}>
      <Search onClear={setOnClear} updateSearch={updateSearch} openFilter={()=>setFilterDialog (!filterDialog)} />
      <Filters iterate={iterate} open={filterDialog} setFilters={setFilters} filters={filters} />
      {body}
    </main>
  )
}

export default Journal
