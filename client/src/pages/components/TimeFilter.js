import {useState, useEffect} from 'react'
import StopwatchSVG from '../../img/stopwatch.svg';
import CaretSVG from '../../img/caret-down.svg'

function TimeFilter ({value, remove, setValue}) {
  const [mode, setMode] = useState (value.mode);
  const [minutes, _setMinutes] = useState (value.minutes);
  const [displayMinutes, setDisplayMinutes] = useState (`00${value.minutes}`.slice (-2))
  const [hours, _setHours] = useState (value.hours);
  const [displayHours, setDisplayHours] = useState (value.hours % 12 || 12);
  const ampm = () => setHours (hours + 12);
  const setMinutes = e => {
    let mins = typeof e === 'object' ? parseInt (e.target.value) : e;
    if (!mins) return setDisplayMinutes ('');
    if (mins >= 60) return _setMinutes (mins % 60);
    if (mins < 0) return _setMinutes (mins + 60);
    _setMinutes (mins);
  }
  const setHours = e => {
    let hrs = typeof e === 'object' ? parseInt (e.target.value) : e;
    if (!hrs) return setDisplayHours ('');
    if (hrs > 24) return _setHours (hrs % 24);
    if (hrs < 0) return _setHours (24 + hrs);
    _setHours (hrs);
  }
  const cycleMode = () => {
    setMode (
      mode === 'is-at' ? 'after' :
      mode === 'after' ? 'before' : 'is-at'
    )
  }
  useEffect (() => {
    setDisplayHours (hours % 12 || 12);
    setDisplayMinutes (`00${minutes}`.slice (-2))
    setValue ({
      mode,
      minutes,
      hours
    });
  }, [minutes, hours, mode]);
  return (
    <li className="grid filter time-filter">
      <span>
        <img src={StopwatchSVG} />
      </span>
      <span className="fake-button" onClick={cycleMode}>
        <span className="grid switch-mode">
          <span>{value.mode === 'is-at' ? 'Exact' : value.mode === 'after' ? 'After' : 'Before'}</span>
          <img style={{display: 'inline', transform: 'rotate(-90deg)'}} width={8} height={8} src={CaretSVG} />
        </span>
      </span>
      <div>
        <input type="tel" value={displayHours} onChange={setHours} />
        <span>:</span>
        <input type="tel" value={displayMinutes} onChange={e=>setMinutes (parseInt (e.target.value))} />
        <span className="fake-button" onClick={ampm}>{hours < 12 ? 'am' : 'pm'}</span>
      </div>
      <span>
        <span className="fake-button" onClick={remove}>remove</span>
      </span>
    </li>
  )
}

export default TimeFilter
