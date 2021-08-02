import {useState, useEffect} from 'react'
import StopwatchSVG from '../../img/stopwatch.svg';
import CaretSVG from '../../img/caret-down.svg'
import TimePicker from './TimePicker';

function TimeFilter ({value, remove, setValue}) {
  const cycleMode = () => {
    let mode =  value.mode === 'is-at' ? 'after' :
                value.mode === 'after' ? 'before' : 'is-at';
    setValue ({time: value.time, mode})
  }
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
        <TimePicker value={value.time} onChange={time => setValue ({time, mode: value.mode})} />
      </div>
      <span>
        <span className="fake-button" onClick={remove}>remove</span>
      </span>
    </li>
  )
}

export default TimeFilter
