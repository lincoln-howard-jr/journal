import { useRef, useState } from "react"
import { entries } from '../auth'

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

function Write ({display}) {
  const [start, setStart] = useState (new Date ());
  const qaRef = useRef ();
  const complete = async () => {
    let questions = Array.from (qaRef.current.querySelectorAll ('b')).map (el => el.innerText);
    let answers = Array.from (qaRef.current.querySelectorAll ('div')).map (el => el.innerText);
    let end = new Date ();
    await entries.post ({questions, answers, start, end});
    Array.from (qaRef.current.querySelectorAll ('div')).map (el => el.innerText = '...');
    setStart (new Date ());
  }
  return (
    <main style={{display}}>
      <h2>{printDate ()}</h2>
      <h3>{getTime (start)}</h3>
      <div ref={qaRef} className="questions">
        <b>What have I done today?</b>
        <div contentEditable>...</div>
        <b>How do I feel?</b>
        <div contentEditable>...</div>
        <b>What else am I going to do?</b>
        <div contentEditable>...</div>
      </div>
      <button onClick={complete}>Complete</button>
    </main>
  )
}

export default Write