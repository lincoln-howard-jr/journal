import { useState, useEffect, useRef } from "react";
import { useApp } from "../../../AppProvider";
import {height, width, padding} from './dimensions'
import Bar from './Bar'

// index a list of entries by time of day
const reduceByTime = (acc, entry) => {
  acc [new Date (entry.start).getHours ()].push (entry);
  return acc;
}
const runIndexByTime = entries => entries.reduce (reduceByTime, new Array (24).fill (1).map (() => []));

export default function () {
  const {journal: {entryList, setFilters}, router: {redirect}} = useApp ();
  const [indexed, setIndexed] = useState (null);
  const [max, setMax] = useState (null)

  // goto a specific time
  const onBarClick = time => async () => {
    setFilters ([
      {
        type: 'time',
        value: {
          mode: 'after',
          time: `${time % 12 || 12}:00 ${time < 12 ? 'am' : 'pm'}`
        }
      },
      {
        type: 'time',
        value: {
          mode: 'before',
          time: `${(time + 1) % 12 || 12}:00 ${(time + 1) < 12 ? 'am' : 'pm'}`
        }
      }
    ]);
    redirect ('/?page=journal');
  }

  // process entry list on change
  useEffect (() => {
    let idx = runIndexByTime (entryList);
    setMax (idx.reduce ((acc, val) => val.length > acc ? val.length : acc , 1) ) 
    setIndexed (idx);
  }, [entryList]);

  if (max === null || !indexed) return null;
  return (
    <figure className="time-of-day">
      <figcaption>Entries By Time Of Day</figcaption>
      <svg key='time-of-day-svg' viewBox={`0 0 ${width} ${height}`}>
        {/** axis */}
        <line x1={2 * padding} y1={height - 2 * padding} x2={width - 2 * padding} y2={height - 2 * padding} />
        {/* hour based bars */}
        {
          new Array (24).fill (1).map ((_, i) => (
            <Bar time={indexed [i]} i={i} hourlyMax={max} onClick={onBarClick (i)} />
          ))
        }
      </svg>
    </figure>
  )
}