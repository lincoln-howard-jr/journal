import { useEffect, useState } from 'react';
import { useApp } from '../../../AppProvider';
import PieChart from './PieChart';
import WordCount from './WordCount';
import { EntriesThisWeek, QuestionsThisWeek, SkillCount, TotalEntryCount } from './Stats';
import TimeOfDayBarChart from './TimeOfDayBarChart';
import SingleMetrixCarousel from './MetrixCarousel';

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
  const {journal: {entryList}} = useApp ();
  const [typeIndex, setTypeIndex] = useState (null);

  // process entry list on change
  useEffect (() => {
    setTypeIndex (runIndexByType (entryList));
  }, [entryList]);

  if (!typeIndex) return null;
  let metrics = [
    // time of day bar chart
    (
      <TimeOfDayBarChart />
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
    ),
    (
      <SingleMetrixCarousel />
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
      <div className="row one-item">
        {metrics [0]}
      </div>
      <div className="row one-item">
        {metrics [3]}
      </div>
      <div className="row one-item">
        {metrics [2]}
      </div>
    </>
  );
}
