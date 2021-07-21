import {useState, useEffect, memo} from 'react';
// component to represent a bar in a bar graph
function _Bar ({key, time, i, width, height, hourlyMax, onClick}) {
  // tooltip state mgmt
  const [showTooltip, setShow] = useState (false);
  const show = e => setShow (true);
  const hide = e => setShow (false);
  // breakdown state mgmt - [ audio % , freeform % , question % ]
  const [breakdown, setBreakdown] = useState ([]);
  useEffect (() => {
    let questionsCount = time.filter (entry => (entry.entryType === 'questions' || !entry.entryType)).length;
    let freeformCount = time.filter (entry => entry.entryType === 'freeform').length;
    let audioCount = time.filter (entry => entry.entryType === 'audio').length;
    let total = questionsCount + freeformCount + audioCount;
    setBreakdown ([audioCount / total, freeformCount / total, questionsCount / total]);
  }, [time]);
  //positioning calculations
  let margin = width / 20;
  let contentWidth = 18 * width / 20;
  let offset = 0.1 * contentWidth / 24;
  const dimensions = {
    x: margin + offset + i * contentWidth / 24,
    width: (contentWidth / 24) - (offset / 2)
  }
  const y0 = (height - 20) - 0.66 * height * time.length / hourlyMax;
  const height_total = 0.66 * height * time.length / hourlyMax;
  // render
  return (
    <g key={key} className="bar-chart-bar" onMouseEnter={show} onMouseLeave={hide} onClick={onClick}>
      <rect {...dimensions} y={y0} height={breakdown [0] * height_total} />
      <rect {...dimensions} y={y0 + breakdown [0] * height_total} height={breakdown [1] * height_total} />
      <rect {...dimensions} y={y0 + (1 - breakdown [2]) * height_total} height={breakdown [2] * height_total} />
      {
        showTooltip &&
        <text x={margin + i * contentWidth / 24} y={height}>{(i % 12) || 12}{i > 11 ? 'PM' : 'AM'}</text>
      }
    </g>
  )
}
const Bar = memo (_Bar)
export default Bar;
