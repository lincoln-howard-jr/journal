import { useEffect, useState } from "react";
import { useApp } from "../../../AppProvider";
import { dateShortHand } from "../../../lib/indexing";
import {width, height, padding} from './dimensions';

export default function SingleMetrix () {
  const {metrix: {metrix, measurements}} = useApp ();
  const [metricIdIndex, setIndex] = useState (0);
  const [metricId, setMetricId] = useState (null);
  const [data, setData] = useState ([]);
  const [prompt, setPrompt] = useState ('');
  const [domain_0, setDomain0] = useState (new Date ());
  const [domain_n, setDomainN] = useState (new Date ());
  const [range_0, setRange0] = useState (0);
  const [range_n, setRangeN] = useState (1);
  
  const xscale = date => padding + (width - 2 * padding) * (date - domain_0) / (domain_n - domain_0);
  const yscale = value => padding + (height - 2 * padding) - (height - 2 * padding) * (value - range_0) / (range_n - range_0);

  useEffect (() => {
    if (!metrix.length) return;
    if (metricId !== metrix [metricIdIndex].id) {
      setMetricId (metrix [metricIdIndex].id);
      return;
    }
    let single = metrix.find (m => m.id === metricId);
    let _data = measurements.filter (m => m.metric === metricId).map (m => Object.assign (m, {measuredAt: new Date (m.measuredAt)})).sort ((a, b) => a.measuredAt - b.measuredAt);
    if (single.unit === 'boolean') _data = _data.map (m => Object.assign (m, {value: m.value === 'Yes' ? 1 : 0}));
    if (!data.length) {
      setIndex ((metricIdIndex + 1) % metrix.length);
      return;
    }
    setData (_data);
    setPrompt (single.prompt);
    setDomain0 (_data [0].measuredAt);
    setDomainN (_data [_data.length - 1].measuredAt);
    if (single.unit === 'number') {
      setRange0 (single.range [0]);
      setRangeN (single.range [1]);
    }
  }, [metricId, metrix, metricIdIndex]);
  
  return (
    <figure className="single-metrix">
      <figcaption style={{display: 'grid', gridTemplateColumns: '16px 1fr 16px', gap: 8}}>
        <span onClick={() => setIndex (metricIdIndex ? metricIdIndex - 1 : metrix.length - 1)}>{'<'}</span>
        <span>{prompt}</span>
        <span onClick={() => setIndex ((metricIdIndex + 1) % metrix.length)}>{'>'}</span>
      </figcaption>
      <svg className="single-metrix" viewBox={`0 0 ${width} ${height}`}>
        <g className="single-metrix-axis">
          <line x1={xscale (domain_0)} x2={xscale (domain_0)} y1={yscale (range_n)} y2={yscale (range_0)} />
          <line x1={xscale (domain_0)} x2={xscale (domain_n)} y1={yscale (range_0)} y2={yscale (range_0)} />
          <text x={xscale (domain_0) - padding} y={yscale (range_0)}>{range_0.toString ()}</text>
          <text x={xscale (domain_0) - padding} y={yscale (range_n)}>{range_n.toString ()}</text>
          <text x={xscale (domain_0)} y={yscale (range_0) + padding}>{dateShortHand (domain_0)}</text>
          <text textAnchor="end" x={xscale (domain_n)} y={yscale (range_0) + padding}>{dateShortHand (domain_n)}</text>
        </g>
        <g className="single-metrix-data">
          {
            data.map (d => (
              <circle cx={xscale (d.measuredAt)} cy={yscale (d.value)} r={3} className="metrix-point" />
            ))
          }
        </g>
      </svg>
    </figure>
  )
}