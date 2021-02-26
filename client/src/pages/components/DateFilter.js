import React, { useEffect, useState } from 'react'
import CalendarSVG from '../../img/calendar.svg'
import CaretSVG from '../../img/caret-down.svg'

const days = [
  0,
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
]

const maxDaysIn = (mm, yyyy) => days [mm] + (yyyy % 4 === 0 ? 1 : 0);

function DateFilter ({value, remove, setValue}) {
  let d = new Date (value.date);
  const [mode, setMode] = useState (value.mode);
  const [mm, setMonth] = useState (d.getMonth () + 1);
  const [dd, setDate] = useState (d.getDate ());
  const [yyyy, setYear] = useState (d.getFullYear ());
  const [maxDays, setMaxDays] = useState (maxDaysIn (mm, yyyy));
  const cycleMode = () => {
    setMode (
      mode === 'single-day' ? 'after' :
      mode === 'after' ? 'before' : 'single-day'
    )
  }
  useEffect (() => {
    if (mm === NaN || dd === NaN || yyyy === NaN) return;
    let max = maxDaysIn (mm, yyyy);
    setMaxDays (max);
    setValue ({
      mode,
      date: new Date (yyyy, mm - 1, dd, 0, 0, 0)
    });
  }, [dd, mm, yyyy, mode]);
  return (
    <li className="grid filter date-filter">
      <span>
        <img src={CalendarSVG} alt="Date Filter" />
      </span>
      <span className="fake-button" onClick={cycleMode}>
        <span className="grid switch-mode">
          <span>
            {
              value.mode === 'single-day' ? 'Day Of' :
              value.mode === 'after' ? 'After' : 'Before'
            }
          </span>
          <img style={{display: 'inline', transform: 'rotate(-90deg)'}} width={8} height={8} src={CaretSVG} />
        </span>
      </span>
      <div>
        <input type="tel" min={1} max={12} defaultValue={mm} onChange={e=>setMonth (parseInt (e.target.value))} />
        <span>/</span>
        <input type="tel" min={1} max={maxDays} defaultValue={dd} onChange={e=>setDate (parseInt (e.target.value))} />
        <span>/</span>
        <input type="tel" min={2020} max={new Date ().getFullYear ()} defaultValue={yyyy} onChange={e=>setYear (parseInt (e.target.value))}/>
      </div>
      <span onClick={remove} className="fake-button">
        remove
      </span>
    </li>
  )
}

export default DateFilter
