import {useCallback, useEffect, useRef, useState, memo} from 'react';
const width = 400;
const height = 100;
const padding = 25;
const radius = 5;
const r = {r: radius};

const _scaleX = (min, max, clientWidth) => {
  const range = max - min;
  const p = (clientWidth * padding / width);
  const w = clientWidth - 2 * p;
  console.log ('scale x generated', {range, p, w, min, max, clientWidth})
  return function (value) {
    if (value < min) value = min;
    if (value > max) value = max;
    return p + w * (value - min) / range * width / clientWidth;
  }
}

const calcValue = (min, max, clientWidth) => {
  const size = (clientWidth / width);
  const w = size * (width - 2 * padding);
  const range = max - min;
  return function (pos) {
    return (pos - (size * padding)) * range / (w);
  }
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
  const [clientWidth, setClientWidth] = useState (width);
  const [inv, setInv] = useState (() => calcValue (min, max, clientWidth));
  const [scaleX, setScaleX] = useState (() => _scaleX (min, max, clientWidth));
  function drag (e) {
    if (!mouseIsDown) return;
    let newVal = e.movementX ? value + (e.movementX * (max - min) / (clientWidth - (clientWidth * radius / width) * 10)) : (e.touches && e.touches.length) ? inv (e.touches [0].clientX): value;
    if (newVal < min) newVal = min; 
    if (newVal > max) newVal = max;
    setValue (newVal);
  }
  useEffect (() => {
    if (svgref.current?.clientWidth) setClientWidth (svgref.current.clientWidth);
  }, [svgref.current?.clientWidth])
  useEffect (() => {
    if (clientWidth) {
      setInv (() => calcValue (min, max, clientWidth));
      setScaleX (() => _scaleX (min, max, clientWidth));
    }
  }, [clientWidth]);
  useEffect (() => {
    (!mouseIsDown && onChange) && onChange (roundToNearestStep ())
  }, [mouseIsDown])
  return (
    <svg ref={svgref} onTouchStart={() => setMouseIsDown (true)} onMouseDown={() => setMouseIsDown (true)} onTouchMove={drag} onTouchCancel={() => setMouseIsDown (false)} onMouseMove={drag} onMouseLeave={() => setMouseIsDown (false)} onMouseUp={() => setMouseIsDown (false)} viewBox={`0 0 ${width} ${height}`} className="component-slider-svg">
      <g className="slider-base">
        <circle cx={scaleX (min)} cy={height / 2} {...r} />
        <line x1={scaleX (min) + radius} x2={scaleX (max) - radius} y1={height / 2} y2={height / 2} />
        <circle cx={scaleX (max)} cy={height / 2} {...r} />
        <text x={scaleX (min)} y={height * .8} textAnchor="left">{min}</text>
        <text x={scaleX(max)} y={height * .8} textAnchor="end">{max}</text>
      </g>
      <g className="slider-value">
        <circle onTouchStart={() => setMouseIsDown (true)} onMouseDown={() => setMouseIsDown (true)} cx={scaleX (value)} cy={height / 2} r={radius * 2} />
        <line x1={scaleX (value)} x2={scaleX (value)} y1={height * .25} y2={height * .35}></line>
        <text x={scaleX (value)} y={height * .2} textAnchor="middle">{roundToNearestStep (value)}</text>
      </g>
    </svg>
  )
}