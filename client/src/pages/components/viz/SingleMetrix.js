import { useEffect, useState } from "react";
import { useApp } from "../../../AppProvider";

const width = 750; const height = 500; const padding = 20;

export default function SingleMetrix ({metricId}) {
  const {metrix: {metrix, measurements}} = useApp ();
  const [data, setData] = useState ([]);
  const [prompt, setPrompt] = useState ('');
  const [domain_0, setDomain0] = useState (new Date ());
  const [domain_n, setDomainN] = useState (new Date ());
  const [range_0, setRange0] = useState (0);
  const [range_n, setRangeN] = useState (1);

  const xscale = date => padding + (width - 2 * padding) * (date - domain_0) / (domain_n - domain_0);
  const yscale = value => padding + (height - 2 * padding) * (range_n - range_0 - value) / (range_n - range_0);

  useEffect (() => {
    if (!metrix.length || !metricId) return;
    let single = metrix.find (m => m.id === metricId);
    let _data = measurements.filter (m => m.metric === metricId).map (m => Object.assign (m, {measuredAt: new Date (m.measuredAt)})).sort ((a, b) => a.measuredAt - b.measuredAt);
    if (single.unit === 'boolean') _data.map (m => m.value === 'Yes' ? 1 : 0);
    setData (_data);
    setPrompt (single.prompt);
    setDomain0 (_data [0].measuredAt);
    setDomainN (_data [_data.length - 1].measuredAt);
    if (single.unit === 'number') {
      setRange0 (single.range [0]);
      setRangeN (single.range [1]);
    }
  }, [metricId, metrix]);
  
  return (
    <svg className="single-metrix" viewBox={`0 0 ${width} ${height}`}>
      <g className="single-metrix-axis">
        <line x1={xscale (domain_0)} x2={xscale (domain_0)} y1={yscale (range_n)} y2={yscale (range_0)} />
        <line x1={xscale (domain_0)} x2={xscale (domain_n)} y1={yscale (range_0)} y2={yscale (range_0)} />
      </g>
    </svg>
  )
}