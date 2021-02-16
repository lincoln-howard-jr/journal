export const months = [
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
export const days = [
  "Sunday",
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const dateShortHand = (_d=new Date ()) => {
  let d = new Date (_d);
  return `${d.getMonth ()}-${d.getDate ()}-${d.getFullYear ()}`.toString ();
}
export const printDate = (_d=new Date ()) => {
  let d = new Date (_d);
  return  `${days [d.getDay ()]}, ${months [d.getMonth ()]} ${d.getDate ()}`;
}
export const getTime = (d=new Date ()) => {  
  return `${(d.getHours () % 12 || 12)}:${`0${d.getMinutes ()}`.slice(-2)} ${d.getHours () > 11 ? 'pm' : 'am'}`;
}

export const findIndex = (indexedArr=[], key, value, meta={}) => {
  let found = indexedArr.filter (el => el [key] === value)
  if (found.length > 0) return found [0].list;
  let index = {[key]: value, meta, list: []};
  indexedArr.push (index);
  return index.list;
}


export const runIndexEntries = (entries) => {
  let arr = entries.map (el => Object.assign (el, {start: new Date (el.start), end: new Date (el.end)}));
  arr.sort ((a, b) => b.start - a.start);
  return arr.reduce ((acc, val) => {
    findIndex (acc, 'date', dateShortHand (val.start), {date: printDate (val.start)}).push (val);
    return acc;
  }, []);
}
