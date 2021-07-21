import { useState } from "react";
import { useApp } from "../../AppProvider";
import defaultQuestions from "../../lib/defaultQuestions";

const metricTypeDict = {
  boolean: 'Yes/No',
  number: 'Number Range'
}

const isNumber = keycode => keycode < 58 && keycode > 47;
const isBackspace = keycode => keycode === 8;
const isLeftArrow = keycode => keycode === 37;
const isRightArrow = keycode => keycode === 39;
const isTab = keycode => keycode === 9;
const isDot = keycode => keycode === 190;

const prevent = e => {
  return [isNumber, isBackspace, isLeftArrow, isRightArrow, isTab, isDot].filter (fn => fn (e.keyCode)).length === 0;
}

const INI = ({value, setValue}) => {
  const okd = e => {
    if (prevent (e)) return e.preventDefault ();
  }
  return (
    <b onBlur={e => setValue (parseFloat (e.target.innerText))} contentEditable onKeyDown={okd}>{value}</b>
  )
}

function MetricSetting ({metric}) {
  const {settings: {getSetting, toggle}} = useApp ();
  return (
    <li className="setting">
      <div>{metric.prompt}</div>
      <div><span className={getSetting (`show-metrix-metric-${metric.id}`) ? 'toggle on' : 'toggle'} onClick={toggle (`show-metrix-metric-${metric.id}`)}></span></div>
    </li>
  )
}

function CustomQuestionSetting ({question, onToggle, getSetting}) {
  return (
    <li className="setting">
      <div>{question}</div>
      <div><span onClick={onToggle (`show-custom-question-${question}`)} className={getSetting (`show-custom-question-${question}`) ? 'toggle on' : 'toggle'} /></div>
    </li>
  )
}

export default function CustomQuestion () {

  // 
  const {writing: {questions, createQuestion}, settings: {toggle, getSetting}, metrix: {metrix, createMetrix}, freeze} = useApp ();
  const [prompt, setQuestion] = useState ('?')
  const [metricType, setMetricType] = useState (null);
  const [rangeFrom, setRangeFrom] = useState (1);
  const [rangeTo, setRangeTo] = useState (10);
  const [stepInterval, setStepInterval] = useState (1);
  const [frequency, setFrequency] = useState ('as needed');

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
    (
      <>
        <b>Create a Prompt</b>
        <div contentEditable className="add-question-input" onInput={e => setQuestion (e.target.innerText)}>?</div>
        <span>
          <button onClick={runCreateQuestion}>Create Question</button>
          <button onClick={() => setStep (currentStep + 1)}>Add Metric</button>
        </span>
      </>
    ),
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
    (
      <>
        <b>Numeric Metric Details</b>
        <p>{prompt}</p>
        <p>
          Number <INI value={rangeFrom} setValue={setRangeFrom} /> to <INI value={rangeTo} setValue={setRangeTo} />   in intervals of <INI value={stepInterval} setValue={setStepInterval} />.
        </p>
        <span>
          <button onClick={() => setStep (currentStep - 1)}>Back</button>
          <button onClick={() => setStep (currentStep + 1)}>Set Frequency</button>
        </span>
      </>
    ),
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
          questions.map (q => <li className="manage-default-question" key={`manage-default-questions-${q.prompt}`}>{q.prompt}</li>)
        }
      </ul>
      <b>Metrix</b>
      <ul className="prompt-list">
        {
          metrix.map (q => <li className="manage-default-question" key={`manage-default-questions-${q.prompt}`}>{q.prompt}</li>)
        }
      </ul>
      <div>
        {steps [currentStep]}
      </div>
    </>
  )

}