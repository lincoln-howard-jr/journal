import { useState, useEffect } from "react";
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
        <Bar time={indexed [0]} i={0} hourlyMax={max} onClick={onBarClick (0)} />
        <Bar time={indexed [1]} i={1} hourlyMax={max} onClick={onBarClick (1)} />
        <Bar time={indexed [2]} i={2} hourlyMax={max} onClick={onBarClick (2)} />
        <Bar time={indexed [3]} i={3} hourlyMax={max} onClick={onBarClick (3)} />
        <Bar time={indexed [4]} i={4} hourlyMax={max} onClick={onBarClick (4)} />
        <Bar time={indexed [5]} i={5} hourlyMax={max} onClick={onBarClick (5)} />
        <Bar time={indexed [6]} i={6} hourlyMax={max} onClick={onBarClick (6)} />
        <Bar time={indexed [7]} i={7} hourlyMax={max} onClick={onBarClick (7)} />
        <Bar time={indexed [8]} i={8} hourlyMax={max} onClick={onBarClick (8)} />
        <Bar time={indexed [9]} i={9} hourlyMax={max} onClick={onBarClick (9)} />
        <Bar time={indexed [10]} i={10} hourlyMax={max} onClick={onBarClick (10)} />
        <Bar time={indexed [11]} i={11} hourlyMax={max} onClick={onBarClick (11)} />
        <Bar time={indexed [12]} i={12} hourlyMax={max} onClick={onBarClick (12)} />
        <Bar time={indexed [13]} i={13} hourlyMax={max} onClick={onBarClick (13)} />
        <Bar time={indexed [14]} i={14} hourlyMax={max} onClick={onBarClick (14)} />
        <Bar time={indexed [15]} i={15} hourlyMax={max} onClick={onBarClick (15)} />
        <Bar time={indexed [16]} i={16} hourlyMax={max} onClick={onBarClick (16)} />
        <Bar time={indexed [17]} i={17} hourlyMax={max} onClick={onBarClick (17)} />
        <Bar time={indexed [18]} i={18} hourlyMax={max} onClick={onBarClick (18)} />
        <Bar time={indexed [19]} i={19} hourlyMax={max} onClick={onBarClick (19)} />
        <Bar time={indexed [20]} i={20} hourlyMax={max} onClick={onBarClick (20)} />
        <Bar time={indexed [21]} i={21} hourlyMax={max} onClick={onBarClick (21)} />
        <Bar time={indexed [22]} i={22} hourlyMax={max} onClick={onBarClick (22)} />
        <Bar time={indexed [23]} i={23} hourlyMax={max} onClick={onBarClick (23)} />
        <g className="bar-chart-text">
          <text x={width / 9} y={height / 10}>Questions</text>
          <text x={4 * width / 9} y={height / 10}>Freeform</text>
          <text x={7 * width / 9} y={height / 10}>Audio</text>
        </g>
      </svg>
    </figure>
  )
}