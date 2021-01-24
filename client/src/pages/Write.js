import { useRef, useState } from "react"
import { entries } from '../auth'
import useSettings from "../hooks/useSettings"

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
const printDate = (d=new Date ()) => {
  return  `${days [d.getDay ()]}, ${months [d.getMonth ()]} ${d.getDate ()}`
}
const getTime = (d=new Date ()) => {  
  return `${(d.getHours () % 12 || 12)}:${`0${d.getMinutes ()}`.slice(-2)} ${d.getHours () > 11 ? 'pm' : 'am'}`;
}

function Write ({display, freeze, settings, createEntry}) {
  const {getSetting} = settings;
  const [start, setStart] = useState (new Date ());
  const qaRef = useRef ();
  const ffRef = useRef ();
  const complete = async () => {
    let unfreeze = freeze ();
    let body = {start, end: new Date (), entryType: getSetting ('freeform') ? 'freeform' : 'questions'};
    try {
      if (body.entryType === 'questions') {
        body.questions = Array.from (qaRef.current.querySelectorAll ('b')).map (el => el.innerText);
        body.answers = Array.from (qaRef.current.querySelectorAll ('div')).map (el => el.innerText);
      } else {
        body.freeform = ffRef.current.innerText;
      }
      await createEntry (body);
      setStart (new Date ());
      if (body.entryType !== 'freeform') Array.from (qaRef.current.querySelectorAll ('div')).map (el => el.innerText = '...');
      if (body.entryType === 'freeform') ffRef.current.innerText = 'Write your entry here!';
      unfreeze ();
    } catch (e) {
      if (body.entryType !== 'freeform') Array.from (qaRef.current.querySelectorAll ('div')).map (el => el.innerText = '...');
      if (body.entryType === 'freeform') ffRef.current.innerText = 'Write your entry here!';
      unfreeze ();
    }
  }
  return (
    <main style={{display}}>
      <h2>{printDate ()}</h2>
      <h3>{getTime (start)}</h3>
      {
        !getSetting ('freeform') &&
        <div ref={qaRef} className="questions">
          <b>What have I done today?</b>
          <div contentEditable>...</div>
          <b>How do I feel?</b>
          <div contentEditable>...</div>
          <b>What else am I going to do?</b>
          <div contentEditable>...</div>
        </div>
      }
      {
        getSetting ('freeform') &&
        <div contentEditable ref={ffRef}>Write your entry here!</div>
      }
      <button onClick={complete}>Complete</button>
    </main>
  )
}

export default Write