import React, { useEffect, useState } from 'react'
import { useApp } from '../../AppProvider';
import CaretSVG from '../../img/caret-down.svg'


function TypeFilter ({value, remove, setValue}) {
  const [mode, setMode] = useState (value.mode);
  const cycleMode = () => {
    setMode (
      mode === 'questions' ? 'freeform' :
      mode === 'freeform' ? 'audio' : 'questions'
    )
  }
  useEffect (() => {
    setValue ({
      mode
    });
  }, [mode]);
  return (
    <li className="grid filter type-filter">
      <span>
        <img src={CalendarSVG} alt="Date Filter" />
      </span>
      <span className="fake-button" onClick={cycleMode}>
        <span className="grid switch-mode">
          <span>
            {
              value.mode === 'questions' ? 'Q&A' :
              value.mode === 'freeform' ? 'Freeform' : 'Audio'
            }
          </span>
          <img style={{display: 'inline', transform: 'rotate(-90deg)'}} width={8} height={8} src={CaretSVG} />
        </span>
      </span>
      <div>
      </div>
      <span onClick={remove} className="fake-button">
        remove
      </span>
    </li>
  )
}

export default TypeFilter
