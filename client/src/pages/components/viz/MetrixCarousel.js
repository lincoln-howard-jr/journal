import { useEffect, useState } from "react";
import { useApp } from "../../../AppProvider";
import { dateShortHand } from "../../../lib/indexing";
import { height, padding, width } from "./dimensions";

export default function SingleMetrixCarousel () {
  const {metrix: {metrix, measurements}} = useApp ();
  const [numberMetrix, setNumberMetrix] = useState (null);
  const [currentMetrixIndex, setCurrentMetrixIndex] = useState (null);
  const [domain, setDomain] = useState (null);
  
  const contentWidth = width - 2 * padding;
  const contentHeight = height - 2 * padding;
  const currentMetrix = () => numberMetrix [currentMetrixIndex];
  const currentMeasurements = () => measurements.filter (mez => mez.metric === numberMetrix [currentMetrixIndex].id).sort ((a, b) => a.measuredAt - b.measuredAt);
  const construct_xscale = () => {
    let [min, max] = domain;
    return value => padding + contentWidth * (value - min) / (max - min)
  }
  const construct_yscale = () => {
    let [min, max] = currentMetrix ().range;
    return value => padding + (contentHeight - contentHeight * (value - min) / (max - min));
  }
  const next = () => setCurrentMetrixIndex ((currentMetrixIndex + 1) % numberMetrix.length);
  const prev = () => currentMetrixIndex === 0 ? numberMetrix.length - 1 : currentMetrixIndex - 1;

  useEffect (() => {
    if (!metrix || !measurements) return;
    setNumberMetrix (metrix.filter (singleMetrix => singleMetrix.unit === 'number').filter (singleMetrix => measurements.filter (mez => mez.metric === singleMetrix.id).length > 1));
  }, [metrix, measurements]);

  useEffect (() => {
    if (numberMetrix && numberMetrix.length) {
      setCurrentMetrixIndex (0);
    }
  }, [numberMetrix])

  useEffect (() => {
    if (currentMetrixIndex === null) return;
    let mez = currentMeasurements ();
    setDomain ([mez [0].measuredAt, mez [mez.length - 1].measuredAt]);
  }, [currentMetrixIndex])

  if (!numberMetrix || currentMetrixIndex === null || !domain) return null;
  let current = currentMetrix ();
  let mezs = currentMeasurements ();
  let xscale = construct_xscale ();
  let yscale = construct_yscale ();
  return (
    <figure className="single-metrix-carousel">
      <figcaption>
        <span>{current.prompt}</span>
      </figcaption>
      <svg className="single-metrix-graph" viewBox={`0 0 ${width} ${height}`}>
        <g className="single-metrix-axis">
          <line x1={xscale (domain [0])} x2={xscale (domain [1])} y1={yscale (current.range [0])} y2={yscale (current.range [0])} />
          <line x1={xscale (domain [0])} x2={xscale (domain [0])} y1={yscale (current.range [0])} y2={yscale (current.range [1])} />
          <text x={xscale (domain [0]) - padding} y={yscale (current.range [0])}textAnchor="start">{current.range [0]}</text>
          <text x={xscale (domain [0]) - padding} y={yscale (current.range [1])}textAnchor="start">{current.range [1]}</text>
          <text x={xscale (domain [0]) + padding} y={yscale (current.range [0]) + padding} textAnchor="middle">{dateShortHand (domain [0])}</text>
          <text x={xscale (domain [1]) - padding} y={yscale (current.range [0]) + padding} textAnchor="middle">{dateShortHand (domain [1])}</text>
        </g>
        <g>
          {
            mezs.map (mez => (
              <circle cx={xscale (mez.measuredAt)} cy={yscale (mez.value)} r={3} />
            ))
          }
        </g>
      </svg>
    </figure>
  )
}