import {useEffect, useState} from 'react';
import {entries as api} from '../auth';
import {runIndexEntries} from '../lib/indexing';

export default function useJournal () {

  const [entryList, setEntryList] = useState ([]); 
  const [entries, setEntries] = useState ([]);
  const getEntries = async () => {
    try {
      let req = await api.get ();
      let arr = await req.json ();
      setEntryList (arr);
    } catch (e) {
    }
  }
  const createEntry = async body => new Promise (async (resolve, reject) => {
    try {
      let req = await api.post (body);
      let entry = await req.json ();
      setEntryList ([...entryList, entry]);
      resolve ();
    } catch (e) {
      let pending = JSON.parse (localStorage.getItem ('pending-actions') || '[]');
      pending.push ({
        action: 'create-entry',
        body
      });
      localStorage.setItem ('pending-actions', JSON.stringify (pending));
      reject (e);
    }
  })

  useEffect (() => {
    let dict = runIndexEntries (entryList);
    setEntries (dict);
  }, [entryList]);

  return {entries, getEntries, createEntry};

}