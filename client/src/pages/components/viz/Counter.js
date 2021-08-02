export default function NumberCounter ({number}) {
  return (
    <svg viewBox="0 0 100 100" className="number-counter">
      <rect x={10} y={10} width={80} height={80} rx={5} />
      <text textAnchor="middle" x={50} y={65}>{number}</text>
    </svg>
  )
}