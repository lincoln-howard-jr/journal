import { useEffect, useState } from "react";
import { useApp } from "../../AppProvider";
import defaultQuestions from "../../lib/defaultQuestions";
import { star, starfilled, trash } from "../../img/images";

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

const INI = ({value, setValue, placeholder}) => {
  return (
    <span className="inline-input">
      <input placeholder={placeholder} type="number" defaultValue={value} onBlur={e => {
        if (!prevent (e)) return e.preventDefault ();
        if (!e.target.value.length) return setValue (0);
        setValue (parseFloat (e.target.value))
      }} />
    </span>
  )
}

const CES = ({value, setValue, placeholder}) => {
  return (
    <span className="inline-input">
      <input placeholder={placeholder} onChange={e => setValue (e.target.value)} value={value} />
    </span>
  )
}

function RemovePromptModal ({prompt, resolve, reject}) {
  const app = useApp ();
  const handleYes = async () => {
    try {
      if (prompt.unit === 'string') await app.writing.deleteQuestion (prompt.id.split ('-') [2]);
      else await app.metrix.deleteMetrix (prompt.id);
      resolve ();
    } catch (e) {
      reject ('Couldn\'t  successfully hide entry!')
    }
  }
  const handleNo = () => reject ('Cancelled');
  return (
    <div className="grid remove-entry-modal">
      <p>
        Are you sure you want to remove the custom prompt
        -
        <b> {prompt.prompt} </b>
        -
        {
          prompt.unit !== 'string' &&
          ' and all measurements made from this metrix '
        }
        from your Journal?
      </p>
      <div>
        <button onClick={handleYes}>Yes, delete it!</button>
        <button onClick={handleNo}>No, don't!</button>
      </div>
    </div>
  )
}

export default function CustomQuestion ({open}) {

  // 
  const {writing: {questions, createQuestion, deleteQuestion}, settings: {toggle, getSetting}, metrix: {metrix, createMetrix}, freeze, setModal, closeModal} = useApp ();
  const [prompt, setQuestion] = useState ('?')
  const [metricType, setMetricType] = useState (null);
  const [rangeFrom, setRangeFrom] = useState ('');
  const [rangeTo, setRangeTo] = useState ('');
  const [stepInterval, setStepInterval] = useState ('');
  const [frequency, setFrequency] = useState ('as needed');
  const [unitLabel, setUnitLabel] = useState (null);
  const [unitDescriptionError, setDescError] = useState ('');

  // remove modal
  const openRemoveModal = prompt => new Promise (async (resolve, reject) => {
    setModal (
      <RemovePromptModal prompt={prompt} resolve={resolve} reject={reject} />
    )
  });
  const remove = prompt => async () => {
    try {
      await openRemoveModal (prompt);
    } finally {
      closeModal ();
    }
  }
  const calculateDescError = () => {
    let errors = [];
    if (typeof rangeFrom !== 'number') errors.push ('min value must be a number');
    if (typeof rangeTo !== 'number') errors.push ('max value must be a number');
    if (rangeFrom >= rangeTo) errors.push ('max value must be greater than min value');
    if (typeof stepInterval !== 'number' || stepInterval <= 0) errors.push ('step interval must be a positive number');
    if (errors.length) setDescError ('Error: ' + errors.join (', '));
    return errors.length === 0;
  }

  // call api to create new question
  const runCreateQuestion = async () => {
    let unfreeze = null;
    try {
      await createQuestion (prompt);
      setQuestion ('?')
      setStep (0);
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
      setQuestion ('?');
      setMetricType (null);
      setRangeFrom ('');
      setRangeTo ('');
      setStepInterval ('');
      setFrequency ('as needed');
      setUnitLabel ('');
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }

  const [currentStep, setStep] = useState (0);
  useEffect (() => {
    setDescError ('');
  }, [currentStep]);
  const steps = [
    // initial step - enter prompt
    (
      <button onClick={() => setStep (currentStep + 1)}>Create a Custom Prompt</button>
    ),
    (
      <>
        <b>Write a Custom Prompt</b>
        <div contentEditable className="add-question-input" onInput={e => setQuestion (e.target.innerText)}>?</div>
        <span>
          <button onClick={() => setStep (currentStep - 1)}>Cancel</button>
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
          <button onClick={() => setStep (currentStep + 1)}>Add Metric</button>
          <button onClick={() => {
            setMetricType ('string');
            setStep (currentStep + 3);
          }}>Create Prompt</button>
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
        {
          unitDescriptionError && unitDescriptionError.length > 0 &&
          <p className="error">{unitDescriptionError}</p>
        }
        <p>
          {
          unitLabel !== null ?
            (
              <>
                Measured with unit <CES placeholder='unit label' value={unitLabel} setValue={setUnitLabel} /> from
              </>
            ) : 'From'}
          {' '}<INI placeholder='min' value={rangeFrom} setValue={setRangeFrom} /> to <INI placeholder='max' value={rangeTo} setValue={setRangeTo} />   in intervals of <INI placeholder='step' value={stepInterval} setValue={setStepInterval} />.
        </p>
        <label><input type="checkbox" defaultChecked={unitLabel} onChange={e => setUnitLabel (e.target.checked ? '' : null)} /> has unit label</label>
        <span>
          <button onClick={() => setStep (currentStep - 1)}>Back</button>
          <button onClick={() => {if (calculateDescError ()) setStep (currentStep + 1)}}>Set Frequency</button>
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
          <button onClick={() => setStep (currentStep - 1)}>Back</button>
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
  if (!open) return null;
  return (
    <>
      <b>Default Prompts</b>
      <ul className="prompt-list">
      {
          defaultQuestions.map (q => (
            <li key={`manage-default-questions-${q.prompt}`} className={`manage-custom-question ${getSetting (`starred-${q.unit}-${q.id}`) ? 'starred' : ''}`}>
              <span onClick={toggle (`starred-${q.unit}-${q.id}`)} style={{cursor: 'pointer'}}><img src={getSetting (`starred-${q.unit}-${q.id}`) ? starfilled : star} /></span>
              <span>{q.prompt}</span>
            </li>
          ))
        }
      </ul>
      <b>Custom Prompts</b>
      <ul className="prompt-list">
        {
          [...questions, ...metrix.filter (m => !m.isDefault)].map (q => (
            <li key={`manage-custom-question-${q.id}`} className={`manage-custom-question ${getSetting (`starred-${q.unit}-${q.id}`) ? 'starred' : ''}`}>
              <span onClick={toggle (`starred-${q.unit}-${q.id}`)} style={{cursor: 'pointer'}}><img src={getSetting (`starred-${q.unit}-${q.id}`) ? starfilled : star} /></span>
              <span>{q.prompt}</span>
              <span style={{cursor: 'pointer'}} onClick={remove (q)}>
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