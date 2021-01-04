import { useEffect, useState } from 'react'
import {entries as api} from '../auth'

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
const dateShortHand = (d=new Date ()) => {
  return `${d.getMonth ()}-${d.getDate ()}-${d.getFullYear ()}`.toString ();
}
const printDate = (d=new Date ()) => {
  return  `${days [d.getDay ()]}, ${months [d.getMonth ()]} ${d.getDate ()}`;
}
const getTime = (d=new Date ()) => {  
  return `${(d.getHours () % 12 || 12)}:${`0${d.getMinutes ()}`.slice(-2)} ${d.getHours () > 11 ? 'pm' : 'am'}`;
}
const findIndex = (indexedArr=[], key, value, meta={}) => {
  let found = indexedArr.filter (el => el [key] === value)
  if (found.length > 0) return found [0].list;
  let index = {[key]: value, meta, list: []};
  indexedArr.push (index);
  return index.list;
}

const EntryHeader = ({date, isOpen, open, close}) => {
  return isOpen ? (
    <header className="entry-header">
      <span onClick={close}>x</span>
      <h2>{date}</h2>
    </header>
  ) : (
    <header className="entry-header">
      <span onClick={open}>more</span>
      <h2>{date}</h2>
    </header>
  )
}

const EntryContents = ({entries, open}) => entries.map (entry => {
  return open ? (
    <div key={`entry-${entry.id}`}>
      {
        entry.questions.map ((q, i) => (
          <p>
            <b>{q} </b>
            {entry.answers [i]}
          </p>
        ))
      }
    </div>
  ) : (<div></div>)
})


function Journal({display}) {
  const [indexed, setIndexed] = useState ([]);
  const [open, setOpen] = useState ([]);
  const getEntries = async () => {
    try {
      let req = await api.get ();
      let arr = await req.json ();
      arr = arr.map (el => Object.assign (el, {start: new Date (el.start), end: new Date (el.end)}));
      let dict = arr.reduce ((acc, val) => {
        findIndex (acc, 'date', dateShortHand (val.start), {date: printDate (val.start)}).push (val);
        return acc;
      }, []);
      setIndexed (dict);
    } catch (e) {
      alert (e);
    }
  }
  useEffect (() => {
    getEntries ();
  }, []);

  return (
    <main style={{display}}>
      {indexed.map (index => (
        <article key={`index-${index.date}`}>
          <EntryHeader date={index.meta.date} isOpen={open.indexOf (index.date) !== -1} open={() => {setOpen (open => [...open, index.date])}} close={() => {
            setOpen (open => open.filter (d => d !== index.date))
          }} index={index} />
          <EntryContents open={open.indexOf (index.date) !== -1} entries={index.list} />
        </article>
      ))}
    </main>
  );
}

export default Journal
