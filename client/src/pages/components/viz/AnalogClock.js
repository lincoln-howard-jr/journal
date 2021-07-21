export default function AnalogClock ({date=new Date ()}) {
  const hourHand = 2 * Math.PI * (date.getHours () * 60 + date.getMinutes ()) / (12 * 60);
  const minuteHand = 2 * Math.PI * date.getMinutes () / 60;
  return (
    <svg viewBox="0 0 50 50" className="analog-clock">
      <circle className="clock-outline" fill="transparent" r={24} cx={25} cy={25} />
      <g className="clock-ticks">
        {
          new Array (12).fill (1).map ((_, i) => (
            <line x1={25 + Math.sin (2 * Math.PI * i / 12) * 21} y1={25 + Math.cos (2 * Math.PI * i / 12) * 21} x2={25 + Math.sin (2 * Math.PI * i / 12) * 22} y2={25 + Math.cos (2 * Math.PI * i / 12) * 22} />
          ))
        }
      </g>
      <line x1={25} x2={25 + 12 * Math.sin (hourHand)} y1={25} y2={25 - 12 * Math.cos (hourHand)} />
      <line x1={25} x2={25 + 18 * Math.sin (minuteHand)} y1={25} y2={25 - 18 * Math.cos (minuteHand)} />
    </svg>
  )
}