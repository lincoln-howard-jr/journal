import { useState } from "react";
import { useApp } from "../../AppProvider";
import defaultQuestions from "../../lib/defaultQuestions";
import { trash } from "../../img/images";

const metricTypeDict = {
  boolean: 'Yes/No',
  number: 'Number Range'
}

const isNumber = key => new RegExp (/[0-9]/, 'g').test (key);
const isBackspace = key => key === 'Backspace';
const isLeftArrow = key => key === 'Left' || key === 'ArrowLeft';
const isRightArrow = key => key === 'Right' || key === 'ArrowRight';
const isDot = key => key === '.';

const prevent = e => {
  return [isNumber, isBackspace, isLeftArrow, isRightArrow, isDot].filter (fn => fn (e.key)).length === 0;
}

const INI = ({value, setValue}) => {
  const okd = e => {
    if (prevent (e)) return e.preventDefault ();
  }
  return (
    <b type="tel" onBlur={e => setValue (parseFloat (e.target.innerText))} contentEditable onKeyDown={okd}>{value}</b>
  )
}

const CES = ({value, setValue}) => {
  return (
    <b onBlur={e => setValue (e.target.innerText)} contentEditable>{value}</b>
  )
}

export default function CustomQuestion () {

  // 
  const {writing: {questions, createQuestion, deleteQuestion}, settings: {toggle, getSetting}, metrix: {metrix, createMetrix, deleteMetrix}, freeze} = useApp ();
  const [prompt, setQuestion] = useState ('?')
  const [metricType, setMetricType] = useState (null);
  const [rangeFrom, setRangeFrom] = useState (1);
  const [rangeTo, setRangeTo] = useState (10);
  const [stepInterval, setStepInterval] = useState (1);
  const [frequency, setFrequency] = useState ('as needed');
  const [unitLabel, setUnitLabel] = useState (null);

  // call api to create new question
  const runCreateQuestion = async () => {
    let unfreeze = null;
    try {
      unfreeze = freeze ();
      await createQuestion (prompt);
      setQuestion ('?')
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }

  // call api to create metric
  const runCreateMetric = async () => {
    let unfreeze = null;
    try {
      unfreeze = freeze ();
      const obj = {
        prompt,
        unit: metricType,
        frequency
      }
      if (unitLabel) obj.unitLabel = unitLabel;
      if (metricType === 'number') {
        obj.range = [rangeFrom, rangeTo];
        obj.step = stepInterval;
      }
      await createMetrix (obj);
      setStep (0);
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }

  const [currentStep, setStep] = useState (0);
  const steps = [
    // initial step - enter prompt
    (
      <>
        <b>Write a Custom Prompt</b>
        <div contentEditable className="add-question-input" onInput={e => setQuestion (e.target.innerText)}>?</div>
        <span>
          <button onClick={() => setStep (currentStep + 1)}>Next</button>
        </span>
      </>
    ),
    // user chooses whether to create a metrix or question
    (
      <>
        <b>Add a Metric?</b>
        <p>{prompt}</p>
        <span>
          <button onClick={() => setStep (currentStep - 1)}>Back</button>
          <button onClick={() => setStep (currentStep + 1)}>Yes, Add Metric</button>
          <button onClick={runCreateQuestion}>No, Create Question</button>
        </span>
      </>
    ),
    // if metrix user selects type
    (
      <>
        <b>Select Metric Type</b>
        <p>{prompt}</p>
        <span>
          <button onClick={() => setStep (currentStep - 1)}>Back</button>
          <button onClick={() => {
            setMetricType ('number');
            setStep (currentStep + 1);
          }}>Numeric</button>
          <button onClick={() => {
            setMetricType ('boolean');
            setStep (currentStep + 2);
          }}>Yes/No</button>
        </span>
      </>
    ),
    // if number select range and unit title
    (
      <>
        <b>Numeric Metric Details</b>
        <p>{prompt}</p>
        <p>
          {
          unitLabel ?
            (
              <>
                Measured with unit <CES value={unitLabel} setValue={setUnitLabel} /> from
              </>
            ) : 'From'}
          {' '}<INI value={rangeFrom} setValue={setRangeFrom} /> to <INI value={rangeTo} setValue={setRangeTo} />   in intervals of <INI value={stepInterval} setValue={setStepInterval} />.
        </p>
        <label><input type="checkbox" defaultChecked={unitLabel} onChange={e => setUnitLabel (e.target.checked ? '...' : false)} /> has unit label</label>
        <span>
          <button onClick={() => setStep (currentStep - 1)}>Back</button>
          <button onClick={() => setStep (currentStep + 1)}>Set Frequency</button>
        </span>
      </>
    ),
    // set how often it should be answered
    (
      <>
        <b>Set Frequency</b>
        <p>{prompt}</p>
        <p>{metricTypeDict [metricType]}</p>
        <p>
          This question should be answered <select onChange={e => setFrequency (e.target.value)}>
            <option>as needed</option>
            <option>daily</option>
            <option>weekly</option>
            <option>monthly</option>
          </select>.
        </p>
        <span>
          <button onClick={() => setStep (currentStep - 2)}>Back</button>
          <button onClick={() => setStep (currentStep + 1)}>Review</button>
        </span>
      </>
    ),
    // review the metrix and create (or go back)
    (
      <>
        <b>{prompt}</b>
        <p>{metricTypeDict [metricType]} - {frequency}</p>
        <span>
          <button onClick={() => setStep (currentStep - 1)}>Back</button>
          <button onClick={() => runCreateMetric ()}>Create Metric</button>
        </span>
      </>
    )
  ]

  return (
    <>
      <b>Default Questions</b>
      <ul className="prompt-list">
        {
          defaultQuestions.map (q => <li className="manage-default-question" key={`manage-default-questions-${q.prompt}`}>{q.prompt}</li>)
        }
      </ul>
      <b>Custom Questions</b>
      <ul className="prompt-list">
        {
          questions.map (q => (
            <li key={`manage-custom-question-${q.id}`} className="manage-custom-question">
              <span></span>
              <span>{q.prompt}</span>
              <span style={{cursor: 'pointer'}} onClick={() => deleteQuestion (q.id.split ('-') [2])}>
                <img src={trash} />
              </span>
            </li>
          ))
        }
      </ul>
      <b>Metrix</b>
      <ul className="prompt-list">
        {
          metrix.map (q => (
            <li key={`manage-custom-metrix-${q.id}`} className="manage-custom-metrix">
              <span></span>
              <span>{q.prompt}</span>
              <span style={{cursor: 'pointer'}} onClick={() => deleteMetrix (q.id)}>
                <img src={trash} />
              </span>
            </li>
          ))
        }
      </ul>
      <div>
        {steps [currentStep]}
      </div>
    </>
  )

}