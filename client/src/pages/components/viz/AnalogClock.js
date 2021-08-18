export default function AnalogClock ({date=new Date (), className=""}) {
  const hourHand = 2 * Math.PI * (date.getHours () * 60 + date.getMinutes ()) / (12 * 60);
  const minuteHand = 2 * Math.PI * date.getMinutes () / 60;
  return (
    <svg viewBox="0 0 100 100" className={"analog-clock " + className}>
      <circle className="clock-outline" fill="transparent" r={48} cx={50} cy={50} />
      <g className="clock-ticks">
        {
          new Array (12).fill (1).map ((_, i) => (
            <line x1={50 + Math.sin (2 * Math.PI * i / 12) * 42} y1={50 + Math.cos (2 * Math.PI * i / 12) * 42} x2={50 + Math.sin (2 * Math.PI * i / 12) * 44} y2={50 + Math.cos (2 * Math.PI * i / 12) * 44} />
          ))
        }
      </g>
      <line x1={50} x2={50 + 24 * Math.sin (hourHand)} y1={50} y2={50 - 24 * Math.cos (hourHand)} />
      <line x1={50} x2={50 + 36 * Math.sin (minuteHand)} y1={50} y2={50 - 36 * Math.cos (minuteHand)} />
    </svg>
  )
}