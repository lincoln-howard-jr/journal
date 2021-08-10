import {memo} from 'react';
import {padding, width, height} from './dimensions';
// component to represent a bar in a bar graph
function _Bar ({key, time, i, hourlyMax, onClick}) {
  // breakdown state mgmt - [ audio % , freeform % , question % ]
  let questionsCount = time.filter (entry => (entry.entryType === 'questions' || !entry.entryType)).length;
  let freeformCount = time.filter (entry => entry.entryType === 'freeform').length;
  let audioCount = time.filter (entry => entry.entryType === 'audio').length;
  let total = questionsCount + freeformCount + audioCount;
  let breakdown = [audioCount / total, freeformCount / total, questionsCount / total];
  // positioning calculations
  let margin = padding * 2;
  let contentWidth = width - 2 * margin;
  let offset = 0.1 * contentWidth / 24;
  const dimensions = {
    x: margin + offset + i * contentWidth / 24,
    width: (contentWidth / 24) - (offset / 2)
  }
  const y0 = (height - margin) - 0.66 * height * time.length / hourlyMax;
  const height_total = 0.66 * height * time.length / hourlyMax;
  let propArr = [
    {
      ...dimensions,
      key: `bar-${i}-breakdown-${0}`,
      y: y0,
      height: breakdown.length > 0 ? (breakdown [0] * height_total) : 0,
    },
    {
      ...dimensions,
      key: `bar-${i}-breakdown-${1}`,
      y: breakdown.length > 0 ? (y0 + breakdown [0] * height_total) : y0,
      height: breakdown.length > 0 ? (breakdown [1] * height_total) : 0,
    },
    {
      ...dimensions,
      key: `bar-${i}-breakdown-${2}`,
      y: breakdown.length > 0 ? (y0 + (1 - breakdown [2]) * height_total) : 0,
      height: breakdown.length > 0 ? (breakdown [2] * height_total) : 0,
    }
  ]
  propArr = propArr.map (props => (isNaN (props.height) ? {...props, height: 0} : props))
  propArr = propArr.map (props => (isNaN (props.y) ? {...props, y: 0} : props))
  // render
  return (
    <g key={key} className="bar-chart-bar" onClick={onClick}>
      <g className="bar-chart-bar-group">
        {
          propArr.map (props => (
            <rect {...props} />
          ))
        }
      </g>
      <text style={{transformOrigin: `${100 * (margin + (i - 0.5) * contentWidth / 24) / width}% ${100 * (height - 10) / height}%`}} className="bar-chart-bar-label" textAnchor="center" x={margin + (i - 0.5) * contentWidth / 24} y={height - padding}>{(i % 12) || 12}{i > 11 ? 'PM' : 'AM'}</text>
    </g>
  )
}
export default memo(_Bar);
