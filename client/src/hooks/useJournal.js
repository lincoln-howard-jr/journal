import {useEffect, useState} from 'react';
import {entries as api, shares} from '../lib/auth';
import constructFilterList from '../lib/filters';
import {runIndexEntries} from '../lib/indexing';

export default function useJournal (freeze) {

  // just journal stuff
  const [entryList, setEntryList] = useState ([]); 
  // filters n stuff
  const [filterIterator, setIter] = useState (0);
  const [filters, actualSetFilter] = useState ([]);
  const [filterList, setFilterList] = useState ([]);
  const [query, setQuery] = useState ('');
  const [entries, setIdx] = useState ([]);
  // stage for removal
  const [toRemove, setToRemove] = useState ([]);
  
  // read
  const getEntries = async userId => {
    try {
      let req = await api.get (userId);
      let arr = await req.json ();
      setEntryList (arr);
    } catch (e) {
    }
  }
  // create
  const createEntry = async body => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      await api.post (body);
      await getEntries ();
      resolve ();
    } catch (e) {
      reject (e);
    } finally {
      unfreeze ();
    }
  })

  // delete
  const hideEntry = async id => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      await api.hide (id);
      await getEntries ();
      resolve ();
    } catch (e) {
      reject (e);
    } finally {
      unfreeze ();
    }
  });

  // calculate filter state
  const setFilters = filters => {
    actualSetFilter (filters);
    let fl = constructFilterList (filters);
    setFilterList (fl);
    setIter (filterIterator + 1);
  }

  // actually query the entrylist
  const runQuery = () => {
    // run all filters
    let result = filterList.reduce ((acc, val) => {
      return acc.filter (val);
    }, entryList);
    // scenario in which there is no query
    if (query.length === 0) return setIdx (runIndexEntries (result));
    // separate freeform/audio/qa
    let freeform = entryList.filter (e => e.entryType === 'freeform')
      .map (entry => Object.assign (entry, {text: entry.freeform}))
      .filter (({text}) => text.match (query.toLowerCase ()));;
    let qa = entryList.filter (e => e.entryType === 'questions')
      .map (entry => Object.assign (entry, {
        text: entry.answers.join (' ').toLowerCase ()
      }))
      .filter (({text}) => text.match (query.toLowerCase ()));
    result = runIndexEntries ([...qa, ...freeform]);
    setIdx (result);
  }

  const clearSearch = () => {
    setFilters ([]);
    setQuery ('');
    setIter (filterIterator + 1);
    return Promise.resolve ();
  }

  // run the query
  useEffect (() => {
    runQuery ();
  }, [entryList, filters.length, query, filterIterator]);

  return {entries, entryList, filters, filterIterator, getEntries, createEntry, hideEntry, setQuery, clearSearch, setFilters};

}