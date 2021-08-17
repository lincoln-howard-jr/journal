const width = 750; const height = 500; const r = 175; const legendItemSize = 25;
function Segment ({start, size}) {
  return (
    <circle fill='transparent' cx={width / 2} cy={height / 2} r={r} strokeWidth={r / 10} strokeDasharray={`${2 * Math.PI * r}`} strokeDashoffset={`${2 * Math.PI * r * (100 - (size)) / 100}`} style={{transformOrigin: 'center', transform: `rotate(${-90 + start * 360 / 100}deg)`}} />
  )
}
export default function PieChart ({data=[]}) {
  
  return (
    <svg className="pie-chart" viewBox={`0 0 ${width} ${height}`}>
      <g className="the-pie">
        {
          data.map (d => (
            <Segment {...d} />
          ))
        }
      </g>
      <g className="legend">
        {
          data.map ((d, i) => (
            <text textAnchor="middle" x={width / 2} y={(legendItemSize * data.length * (i - (data.length - 1) / 2) / ((data.length - 1) / 2)) + height / 2}>{d.label}</text>
          ))
        }
      </g>
    </svg>
  )
}