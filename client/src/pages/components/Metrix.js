import { useEffect, useRef, useState } from "react";
import { useApp } from "../../AppProvider";
import MoreSVG from '../../img/more.svg';
import Slider from "./Slider";

export const units = {
  boolean: 'Yes/No',
  number: 'Number',
  string: 'Question & Answer'
}

export function BooleanMetric ({onChange, defaultValue}) {
  return (
    <div>
      <select defaultValue={defaultValue} onChange={e => onChange (e.target.value === '' ? undefined : e.target.value)}>
        <option value={undefined}></option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </div>
  )
}

export function NumberMetric ({onChange, defaultValue, range, step}) {
  return (
    <div>
      <Slider range={range} step={step} defaultValue={defaultValue} onChange={onChange} />
    </div>
  )
}

export function StringMetric ({onChange, autofocus, defaultValue='...'}) {
  const ref = useRef ();
  const [isFirstFocus, setIsFirstFocus] = useState (defaultValue === '...');
  const onFirstFocus = () => {
    if (!isFirstFocus) return;
    ref.current.innerText = '';
    setIsFirstFocus (false);
  }
  useEffect (() => {
    if (ref.current && autofocus) {
      ref.current.focus ();
    }
  }, [ref]);
  return (
    <div ref={ref} onFocus={onFirstFocus} contentEditable onBlur={e => onChange (e.target.innerText)}>{defaultValue}</div>
  )
}

export const MetrixType = {
  boolean: BooleanMetric,
  number: NumberMetric,
  string: StringMetric
}

export default function MetrixToggles () {
  
  const {metrix: {metrix}} = useApp ();

  // const submit = async () => {
  //   await createMeasurements ();
  //   redirect ('/?page=dash')
  // }

  // // route parameter determined prompts
  // if (user && page === 'metrix' && params.get ('take-action') === 'prompt' && metrix.length) {
  //   return (
  //     <main id="custom-question-editor">
  //       <H1>Metrix</H1>
  //       {
  //         params.getAll ('measure-metric-id').filter (id => !isCaptured (id)).map (metricId => metrix.find (m => m.id === metricId)).filter (m => m).map (metric => (
  //         <>
  //           <b>{metric.prompt}</b>
  //           <div className={`metrix ${metric.unit}`}>
  //             {
  //               metric.unit === 'boolean' &&
  //               <BooleanMetric onChange={value => {console.log ('click', value); measure (metric, value)}} />
  //             }
  //             {
  //               metric.unit === 'number' &&
  //               <NumberMetric range={metric.range ? metric.range : [1, 10]} step={metric.step ? metric.step : 1} onChange={value => measure (metric, value)} />
  //             }
  //           </div>
  //         </>
  //         ))
  //       }
  //       {
  //         !!params.getAll ('measure-metric-id').filter (id => !isCaptured (id)).map (metricId => metrix.find (m => m.id === metricId)).map (metricId => metrix.find (m => m.id === metricId)).filter (m => m).length &&
  //         <button onClick={submit}>Submit</button>
  //       }
  //       {
  //         !params.getAll ('measure-metric-id').filter (id => !isCaptured (id)).map (metricId => metrix.find (m => m.id === metricId)).map (metricId => metrix.find (m => m.id === metricId)).filter (m => m).length &&
  //         <div className="grid">Congrats :) you're ahead of schedule! Nothing left to do here!</div>
  //       }
  //     </main>
  //   );
  // }

  return (
    <>
      <ul className="current-metrix-list">
        {
          metrix.map (metric => (
            <li className="metrix-metric">
              <b>{metric.prompt}</b>
              <span>{units [metric.unit]}</span>
              <span><img src={MoreSVG} /></span>
            </li>
          ))
        }
      </ul>
    </>
  );
}