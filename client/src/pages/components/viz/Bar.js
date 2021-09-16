import {useEffect, useRef, useState} from 'react';
import {padding, width, height} from './dimensions';
// component to represent a bar in a bar graph
function Bar ({key, time, i, hourlyMax, onClick}) {
  // positioning calculations
  let margin = padding * 2;
  let contentWidth = width - 2 * margin;
  let offset = 0.1 * contentWidth / 24;
  let x = margin + offset + i * contentWidth / 24;
  let y = (height - margin) - 0.8 * height * time.length / hourlyMax;
  let w = (contentWidth / 24) - (offset / 2);
  let h = 0.8 * height * time.length / hourlyMax;
  const [dimensions, setDimensions] = useState ({
    x,
    y,
    width: w,
    height: h,
    style: {
      transformOrigin: `${100 * (x + w / 2) / width}% ${100 * (y + h / 2) / height}%`,
      transform: 'rotate(180deg)'
    }
  })
  // render
  return (
    <g key={key} className="bar-chart-bar">
      <g className="bar-chart-bar-group" onClick={onClick}>
        <rect {...dimensions}>
          {
            dimensions.height > 0 &&
            <animate attributeName="height" from={0} to={dimensions.height} dur="1s" restart="whenNotActive" />
          }
        </rect>
      </g>
      <text style={{transformOrigin: `${100 * (margin + (i - 0.5) * contentWidth / 24) / width}% ${100 * (height - 10) / height}%`}} className="bar-chart-bar-label" textAnchor="center" x={margin + (i - 0.5) * contentWidth / 24} y={height - padding}>{(i % 12) || 12}{i > 11 ? 'PM' : 'AM'}</text>
    </g>
  )
}
export default Bar;