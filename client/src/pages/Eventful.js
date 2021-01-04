import React, { useState, useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight, faCalendar, faCheck} from '@fortawesome/free-solid-svg-icons'
import './Eventful.css'
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
];
const week = 'Sun Mon Tu Wed Th Fri Sat'.split (' ');
const getDate = (date=new Date ()) => {
  let y = date.getFullYear ();
  let m = months [date.getMonth ()];
  let d = date.getDate ();
  return `${m} ${d}, ${y}`;
}
function* cellGenerator (onClick, selected, year, month) {
  let dayOfWeek = new Date (year, month, 1).getDay ();
  let max = new Date (year, month, 0).getDate ();
  let position = 0;
  while (position < 42) {
    if (dayOfWeek <= position && (position - dayOfWeek) < max) {
      yield (
        <td className={`eventful-cell ${(selected.getFullYear () === year && selected.getMonth () === month - 1 && selected.getDate () === position - dayOfWeek + 1) ? ' selected' : ''}`} onClick={onClick (month, position - dayOfWeek + 1, year)}>
          <span className="eventful-cell-number">{position - dayOfWeek + 1}</span>
        </td>
      )
    } else {
      yield (<td className="eventful-cell blank" />);
    }
    position++;
  }
}
// Eventful calendar module
function Eventful({name, onChange, defaultValue=new Date (), data=[]}) {
  // state management
  const [open, setOpen] = useState (false);
  const [date, setDate] = useState (defaultValue.getDate ());
  const [month, setMonth] = useState (defaultValue.getMonth ());
  const [year, setYear] = useState (defaultValue.getFullYear ());
  const [viewMonth, setViewMonth] = useState (defaultValue.getMonth ());
  const [viewYear, setViewYear] = useState (defaultValue.getFullYear ());
  const [selected, setSelected] = useState (defaultValue);
  const [typeYearMode, setTypeYearMode] = useState (false);
  const [marked, setMarked] = useState ({});
  
  const filterDataByMonth = (mm, yyyy, key='start') => key ? obj => {
    return new Date (obj [key]).getFullYear () === yyyy && new Date (obj [key]).getMonth () === mm;
  } : date => date.getFullYear () === yyyy && date.getMonth () === mm;
  
  const indexByDayOfMonth = (key='start') => (acc, val) => {
    let date = new Date (val [key]).getDate ();
    if (acc [date]) acc [date] = [...acc [date], val];
    else acc [date] = [val];
    return acc;
  }

  useEffect (() => {
    let relevant = data.filter (filterDataByMonth (viewMonth, viewYear));
    let spec = relevant.reduce (indexByDayOfMonth (), {});
    setMarked (spec);
  }, [viewMonth, viewYear, data]);

  // if not open
  useEffect (() => {
    setSelected (new Date (year, month, date));
  }, [month, date, year]);
  if (!open) return (
    <label className="eventful-label" onClick={() => {setOpen (true)}}>
      <span className="eventful-label-name"><FontAwesomeIcon icon={faCalendar} /></span>
      <span className="eventful-label-value">{getDate (selected)}</span>
    </label>
  )
  // change months
  const clickBack = () => viewMonth === 1 ? (setViewMonth (11) || setViewYear (viewYear - 1)) : setViewMonth (viewMonth - 1);
  const clickNext = () => viewMonth === 11 ? (setViewMonth (1) || setViewYear (viewYear + 1)) : setViewMonth (viewMonth + 1);
  const clickCell = (m, d, y) => () => {
    setMonth (m);
    setDate (d);
    setYear (y);
    setSelected (new Date (y, m, d));
    onChange ({
      persist: a=>a,
      target: {
        name: name || 'date',
        value: new Date (y, m, d),
        setCustomValidity: a=>a
      }
    });
  }
  // generate cells
  const cells = cellGenerator (clickCell, selected, viewYear, viewMonth);
  // when open
  return (
    <>
      <div className="eventful-numbers">
        <span></span>
        <input className="month" type="number" defaultValue={month} min={1} max={12} onChange={e => {setMonth (parseInt (e.target.value) - 1)}} />
        /
        <input className="day" type="number" defaultValue={date} min={1} max={new Date (year, month, 0).getDate ()} onChange={e => {setDate (parseInt (e.target.value))}} />
        /
        <input className="year" type="number" defaultValue={year} onChange={e => {setYear (parseInt (e.target.value))}} />
        <span></span>
      </div>
      <div className="eventful-calendar">
        <header style={{marginTop: 15}}>
          <span onClick={clickBack}><FontAwesomeIcon icon={faChevronLeft} /></span>
          <span>
            {months [viewMonth]}
            &nbsp;
            { !typeYearMode && <span className="number-input-on-click" onClick={() => {setTypeYearMode (true)}}>{viewYear}</span> }
            { !!typeYearMode && <span><input className="number-input" onChange={e => setViewYear (parseInt (e.target.value))} defaultValue={viewYear} type="number" /><FontAwesomeIcon onClick={() => {setTypeYearMode (false)}} icon={faCheck}/> </span>}
          </span>
          <span onClick={clickNext}><FontAwesomeIcon icon={faChevronRight} /></span>
        </header>
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr className="eventful-row">
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
            </tr>
            <tr className="eventful-row">
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
            </tr>
            <tr className="eventful-row">
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
            </tr>
            <tr className="eventful-row">
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
            </tr>
            <tr className="eventful-row">
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
            </tr>
            <tr className="eventful-row">
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
              {cells.next ().value}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Eventful
