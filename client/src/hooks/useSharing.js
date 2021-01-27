import {useState} from 'react';
import {shares as api} from '../auth';

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
  "Sunday",
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
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

export default function useSharing () {

  const [sharing, setSharing] = useState ([]);
  const getShares = async () => {
    try {
      let req = await api.get ();
      let arr = await req.json ();
      setSharing (arr);
    } catch (e) {
      alert (e);
    }
  }
  const getShareById = async id => new Promise (async (resolve, reject) => {
    try {
      let req = await api.getById (id);
      let arr = await req.json ();
      arr = arr.map (el => Object.assign (el, {start: new Date (el.start), end: new Date (el.end)}));
      arr.sort ((a, b) => b.start - a.start);
      let dict = arr.reduce ((acc, val) => {
        findIndex (acc, 'date', dateShortHand (val.start), {date: printDate (val.start)}).push (val);
        return acc;
      }, []);
      resolve (dict);
    } catch (e) {
      reject (e);
    }
  })
  const shareJournal = async (phone, name) => new Promise (async (resolve, reject) => {
    try {
      let shareWith = (phone.length === 10) ? `+1${phone}` : phone;
      await api.post ({shareWith, name});

      alert (`Successfully shared your journal with ${phone}!`);
      resolve ();
    } catch (e) {
      reject (e);
    }
  })

  return {sharing, getShareById, getShares, shareJournal};

}