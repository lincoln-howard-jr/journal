import {useState} from 'react';
import {entries as api} from '../auth';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]
const dateShortHand = (_d=new Date ()) => {
  let d = new Date (_d);
  return `${d.getMonth ()}-${d.getDate ()}-${d.getFullYear ()}`.toString ();
}
const printDate = (_d=new Date ()) => {
  let d = new Date (_d);
  return  `${days [d.getDay ()]}, ${months [d.getMonth ()]} ${d.getDate ()}`;
}

const findIndex = (indexedArr=[], key, value, meta={}) => {
  let found = indexedArr.filter (el => el [key] === value)
  if (found.length > 0) return found [0].list;
  let index = {[key]: value, meta, list: []};
  indexedArr.push (index);
  return index.list;
}

export default function useJournal () {

  const [entries, setEntries] = useState ([]);
  const getEntries = async () => {
    try {
      let req = await api.get ();
      let arr = await req.json ();
      arr = arr.map (el => Object.assign (el, {start: new Date (el.start), end: new Date (el.end)}));
      arr.sort ((a, b) => b.start - a.start);
      let dict = arr.reduce ((acc, val) => {
        findIndex (acc, 'date', dateShortHand (val.start), {date: printDate (val.start)}).push (val);
        return acc;
      }, []);
      setEntries (dict);
    } catch (e) {
      alert (e);
    }
  }
  const createEntry = async body => new Promise (async (resolve, reject) => {
    try {
      setEntries (entries => {
        let idx = findIndex (entries, 'date', dateShortHand (body.start), {date: printDate (body.start)});
        idx.push (body);
        return entries;
      })
      await api.post (body);
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

  return {entries, getEntries, createEntry};

}