import { useEffect, useState } from 'react';
import { useApp } from '../../../AppProvider';
import PieChart from './PieChart';
import WordCount from './WordCount';
import Bar from './Bar';
import {width, height, padding} from './dimensions';
import SingleMetrix from './SingleMetrix';
import { EntriesThisWeek, QuestionsThisWeek, SkillCount, TotalEntryCount } from './Stats';

// calculate days between 2 dates
const oneDay = 1000 * 60 * 60 * 24

// index a list of entries by time of day
const reduceByTime = (acc, entry) => {
  acc [new Date (entry.start).getHours ()].push (entry);
  return acc;
}
const runIndexByTime = entries => entries.reduce (reduceByTime, new Array (24).fill (1).map (() => []));

// index list of entries by entry type
const reduceByType = (acc, entry) => {
  if (acc [entry.entryType]) acc [entry.entryType].push (entry);
  else acc [entry.entryType] = [entry];
  return acc;
}
// const runIndexByType = entries => entries.reduce (reduceByType, {});
const runIndexByType = entries => {
  let idx = entries.reduce (reduceByType, {});
  let labels = Object.keys (idx);
  let data = [];
  while (labels.length > 0) {
    let label = labels.pop ();
    let start = data.length === 0 ? 0 : data [0].start + data [0].size;
    let size = 100 * idx [label].length / entries.length;
    data.unshift ({label, start, size});
  }
  return data;
}

export default function Metrics () {
  const {journal: {entryList, setFilters}, router: {redirect}} = useApp ();
  const [indexed, setIndexed] = useState (null);
  const [typeIndex, setTypeIndex] = useState (null);
  const [hourlyMax, setMax] = useState (-1);

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
    setTypeIndex (runIndexByType (entryList));
  }, [entryList]);

  if (!indexed) return null;
  let metrics = [
    // time of day bar chart
    (
      <figure className="time-of-day">
        <figcaption>Entries By Time Of Day</figcaption>
        <svg key='time-of-day-svg' viewBox={`0 0 ${width} ${height}`}>
          {/** axis */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} />
          {/* hour based bars */}
          {
            indexed.map ((time, i) => <Bar key={`bar-chart-bar-${i}`} time={time} i={i} height={height} width={width} hourlyMax={hourlyMax} onClick={onBarClick (i)} />)
          }
          <g className="bar-chart-text">
            <text x={width / 9} y={height / 10}>Questions</text>
            <text x={4 * width / 9} y={height / 10}>Freeform</text>
            <text x={7 * width / 9} y={height / 10}>Audio</text>
          </g>
        </svg>
      </figure>
    ),
    // type of entry pie chart
    (
      <figure className="type-of-entry">
        <figcaption>Entries By Type</figcaption>
        <PieChart data={typeIndex} />
      </figure>
    ),
    (
      <WordCount />
    )
  ]
  // return the dashboard
  return (
    <>
      <div className="row four-items">
        <QuestionsThisWeek />
        <EntriesThisWeek />
        <TotalEntryCount />
        <SkillCount />
      </div>
      <div className="row two-items">
        {metrics [0]}
        {metrics [1]}
      </div>
      <div className="row one-item">
        {metrics [2]}
      </div>
    </>
  );
}
