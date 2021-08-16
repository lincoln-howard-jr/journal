import {useEffect, useRef, useState} from 'react';
const width = 400;
const height = 100;
const padding = 25;
const radius = 5;
const r = {r: radius};

const scaleX = (min, max) => {
  const range = max - min;
  const w = width - 2 * padding;
  return value => {
    if (value < min) value = min;
    if (value > max) value = max;
    return padding + (w) * (value - min) / range;
  }
}

const calcValue = (min, max, _width=width) => {
  const range = max - min;
  const w = _width - 2 * (padding * _width / width);
  return position => (position - padding) * range / w;
}

export default function Slider ({range: [min, max], step, defaultValue, onChange}) {
  const svgref = useRef ();
  const [value, setValue] = useState (defaultValue || min);
  const [mouseIsDown, setMouseIsDown] = useState (false);
  const roundToNearestStep = () => {
    let decimals = step % 1 ? `${step}`.split ('.') [1].length : 0;
    let parse = decimals ? parseFloat : parseInt;
    let newVal = Math.round (min + (value - min) / step) * step;
    newVal = parse (newVal.toFixed (decimals));
    if (newVal < min) newVal = min; 
    if (newVal > max) newVal = max;
    return newVal;
  }
  const pos = scaleX (min, max);
  const drag = e => {
    if (!mouseIsDown) return;
    const inv = calcValue (min, max, svgref.current.clientWidth);
    let newVal = e.movementX ? value + (e.movementX * (max - min) / (svgref.current.clientWidth - (svgref.current.clientWidth * radius / width) * 10)) : (e.touches && e.touches.length) ? inv (e.touches [0].clientX): value;
    if (newVal < min) newVal = min; 
    if (newVal > max) newVal = max;
    setValue (newVal);
  }
  useEffect (() => {
    onChange && onChange (roundToNearestStep ())
  }, [value])
  return (
    <svg ref={svgref} onTouchMove={drag} onTouchCancel={() => setMouseIsDown (false)} onMouseMove={drag} onMouseLeave={() => setMouseIsDown (false)} onMouseUp={() => setMouseIsDown (false)} viewBox={`0 0 ${width} ${height}`} className="component-slider-svg">
      <g className="slider-base">
        <circle cx={pos (min)} cy={height / 2} {...r} />
        <line x1={pos (min) + radius} x2={pos (max) - radius} y1={height / 2} y2={height / 2} />
        <circle cx={pos (max)} cy={height / 2} {...r} />
        <text x={pos (min)} y={height * .8} textAnchor="left">{min}</text>
        <text x={pos(max)} y={height * .8} textAnchor="end">{max}</text>
      </g>
      <g className="slider-value">
        <circle onTouchStart={() => setMouseIsDown (true)} onMouseDown={() => setMouseIsDown (true)} cx={pos (value)} cy={height / 2} r={radius * 2} />
        <line x1={pos (value)} x2={pos (value)} y1={height * .25} y2={height * .35}></line>
        <text x={pos (value)} y={height * .2} textAnchor="middle">{roundToNearestStep (value)}</text>
      </g>
    </svg>
  )
}