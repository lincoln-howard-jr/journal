import { memo, useEffect, useState } from "react";
import { useApp } from "../../../AppProvider";
import { caretdown } from "../../../img/images";
import { dateShortHand } from "../../../lib/indexing";
import { height, padding, width } from "./dimensions";
import PieChart from "./PieChart";

// helper constants
const contentWidth = width - 2 * padding;
const contentHeight = height - 2 * padding;
let midnight = new Date ();
midnight = new Date (midnight.getFullYear (), midnight.getMonth (), midnight.getDate () + 1);
const oneDay = 24 * 60 * 60 * 1000;
function daysAfter (date) {
  return Math.ceil ((midnight.getTime () - date.getTime ()) / oneDay);
}
function weeksAfter (date) {
  return Math.ceil ((midnight.getTime () - date.getTime ()) / (7 * oneDay));
}
function monthsAfter (date) {
  return 12 * (midnight.getFullYear () - date.getFullYear ()) + midnight.getMonth () - date.getMonth ();
}

const BooleanMetrixGraph = memo (
  function _BooleanMetrixGraph ({mezs, metric}) {
    if (!mezs.length) return <p>No measurements yet!</p>
    const yesCount = mezs.filter (mez => mez.measurement === 'Yes').length;
    const noCount = mezs.filter (mez => mez.measurement === 'No').length;
    let blankCount = 0;
    if (metric.frequency === 'daily') {
      blankCount = daysAfter (mezs [0].measuredAt) - yesCount - noCount;
    }
    if (metric.frequency === 'weekly') {
      blankCount = weeksAfter (mezs [0].measuredAt) - yesCount - noCount;
    }
    if (metric.frequency === 'monthly') {
      blankCount = monthsAfter (mezs [0].measuredAt) - yesCount - noCount;
    }
    let total = yesCount + noCount + blankCount;
    const data = [
      {
        label: 'Yes',
        size: 100 * yesCount / total,
        start: 0
      },
      {
        label: 'No',
        size: 100 * noCount / total,
        start: 100 * yesCount / total
      }
    ]
    if (blankCount) data.push ({
      label: 'Blank',
      size: 100 * blankCount / total,
      start: 100 -100 * blankCount / total
    })
    return (
      <PieChart data={data} />
    )
  }
)
const NumberMetrixGraph = memo (
  function _NumberMetrixGraph ({mezs, onClick, metric}) {
    if (!mezs.length) return <p>No measurements yet!</p>
    const domain = [mezs [0].measuredAt, midnight];
    const xscale = date => padding + contentWidth * (date - domain [0]) / (domain [1] - domain [0]);
    const range = metric.range;
    const yscale = measurement => padding + (contentHeight - contentHeight * (measurement - range [0]) / (range [1] - range [0]));
    return (
      <svg className="single-metrix-graph" viewBox={`0 0 ${width} ${height}`}>
        <g className="single-metrix-axis">
          <line x1={xscale (domain [0])} x2={xscale (domain [1])} y1={yscale (range [0])} y2={yscale (range [0])} />
          <line x1={xscale (domain [0])} x2={xscale (domain [0])} y1={yscale (range [0])} y2={yscale (range [1])} />
          <text x={xscale (domain [0]) - padding} y={yscale (range [0])}textAnchor="start">{range [0]}</text>
          <text x={xscale (domain [0]) - padding} y={yscale (range [1])}textAnchor="start">{range [1]}</text>
          <text x={xscale (domain [0]) + padding} y={yscale (range [0]) + padding} textAnchor="middle">{dateShortHand (domain [0])}</text>
          <text x={xscale (domain [1]) - padding} y={yscale (range [0]) + padding} textAnchor="middle">{dateShortHand (domain [1])}</text>
        </g>
        <g>
          {
            mezs.map (mez => (
              <circle style={{transformOrigin:`${100 * xscale (mez.measuredAt) / width}% ${100 * (height - padding) / height}%`}} key={`metrix-graph-circle-${mez.id}`} onClick={onClick (mez)} cx={xscale (mez.measuredAt)} cy={yscale (mez.measurement)} r={8} />
            ))
          }
        </g>
      </svg>
    )
  }
)

const Graphs = {
  boolean: BooleanMetrixGraph,
  number: NumberMetrixGraph
}

export default function SingleMetrixCarousel () {
  const {metrix: {metrix, setSingleMetrix, setSingleMeasurement, measurements}, router: {redirect}} = useApp ();
  const [currentMetrixIndex, setCurrentMetrixIndex] = useState (null);
  const [select, setSelect] = useState (false);
  
  const currentMetrix = () => metrix [currentMetrixIndex];
  const currentMeasurements = () => measurements.filter (mez => mez.metric === metrix [currentMetrixIndex].id).sort ((a, b) => a.measuredAt - b.measuredAt);

  const onClick = (mez) => () => {
    setSingleMetrix (metrix [currentMetrixIndex]);
    setSingleMeasurement (mez);
    redirect ('/?page=metrix');
  }

  useEffect (() => {
    if (metrix.length && measurements.length) {
      setCurrentMetrixIndex (0);
    }
  }, [metrix, measurements])

  if (currentMetrixIndex === null) return null;
  let current = currentMetrix ();
  let mezs = currentMeasurements ();
  let Graph = Graphs [current.unit];
  return (
    <figure className="single-metrix-carousel">
      <figcaption>
        {
          select &&
          <>
            Switch to another metrix:
            <br/>
            <select onChange={e => {setCurrentMetrixIndex (e.target.value); setSelect (false)}}>
              <option value={currentMetrixIndex}></option>
              {
                metrix.filter (m => m.id !== current.id).map (m => (
                  <option key={`metrix-carousel-select-${m.id}`} value={metrix.indexOf (m)}>{m.prompt}</option>
                ))
              }
            </select>
          </>
        }
        {
          !select &&
          <p>
            <span>{current.prompt}</span>
            <span onClick={setSelect}><img style={{cursor: 'pointer'}} src={caretdown} /></span>
          </p>
        }
      </figcaption>
      <Graph onClick={onClick} metric={current} mezs={mezs} />
    </figure>
  )
}