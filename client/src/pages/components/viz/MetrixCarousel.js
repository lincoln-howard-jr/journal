import { useEffect, useState } from "react";
import { useApp } from "../../../AppProvider";
import { caretdown } from "../../../img/images";
import { dateShortHand } from "../../../lib/indexing";
import { height, padding, width } from "./dimensions";

export default function SingleMetrixCarousel () {
  const {metrix: {metrix, setSingleMetrix, setSingleMeasurement, measurements}, router: {redirect}} = useApp ();
  const [numberMetrix, setNumberMetrix] = useState (null);
  const [currentMetrixIndex, setCurrentMetrixIndex] = useState (null);
  const [domain, setDomain] = useState (null);
  const [select, setSelect] = useState (false);
  
  const contentWidth = width - 2 * padding;
  const contentHeight = height - 2 * padding;
  const currentMetrix = () => numberMetrix [currentMetrixIndex];
  const currentMeasurements = () => measurements.filter (mez => mez.metric === numberMetrix [currentMetrixIndex].id).sort ((a, b) => a.measuredAt - b.measuredAt);
  const construct_xscale = () => {
    let [min, max] = domain;
    return measurement => padding + contentWidth * (measurement - min) / (max - min)
  }
  const construct_yscale = () => {
    let [min, max] = currentMetrix ().range;
    return measurement => padding + (contentHeight - contentHeight * (measurement - min) / (max - min));
  }

  const onClick = (mez) => () => {
    setSingleMetrix (numberMetrix [currentMetrixIndex]);
    setSingleMeasurement (mez);
    redirect ('/?page=metrix');
  }

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
        {
          select &&
          <>
            Switch to another metrix:
            <br/>
            <select onChange={e => {setCurrentMetrixIndex (e.target.value); setSelect (false)}}>
              <option value={currentMetrixIndex}></option>
              {
                numberMetrix.filter (m => m.id !== current.id).map (m => (
                  <option key={`metrix-carousel-select-${m.id}`} value={numberMetrix.findIndex (met => met.id === m.id)}>{m.prompt}</option>
                ))
              }
            </select>
          </>
        }
        {
          !select &&
          <>
            {current.prompt}
            <span onClick={setSelect}><img style={{cursor: 'pointer', marginInline: '1ch', width: 'var(--body-text-size)'}} src={caretdown} /></span>
          </>
        }
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
              <circle onClick={onClick (mez)} cx={xscale (mez.measuredAt)} cy={yscale (mez.measurement)} r={5} />
            ))
          }
        </g>
      </svg>
    </figure>
  )
}