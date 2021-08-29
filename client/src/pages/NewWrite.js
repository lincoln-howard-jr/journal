import React, { useState, useEffect } from "react";
import { useApp } from "../AppProvider";
import {MetrixType} from './components/Metrix'
import {H1, H2, H3} from './components/Headers'
import {printDate, getTime} from '../lib/indexing';
import CancelSVG from '../img/cancel.svg'
import TrashSVG from '../img/trash.svg'
import defaultPrompts, {defaultQuestions, defaultMetrix} from "../lib/defaultQuestions";
import { scrollToTop } from "../lib/scrolling";

const typeDict = {
  boolean: '(metric) ',
  number: '(metric) ',
  string: '',
  freeform: '[freeform]',
  audio: '[audio]'
}

const freeformPrompt = {
  id: 'freeform',
  unit: 'freeform',
  frequency: 'as needed',
  prompt: ''
}

const audioPrompt = {
  id: 'audio',
  unit: 'audio',
  frequency: 'as needed',
  prompt: ''
}

export default function Write () {

  // state stuff
  const {
    auth: {user},
    router: {page},
    journal: {createEntry},
    settings: {getSetting},
    writing: {questions},
    metrix: {metrix, createMeasurements, measure, isCaptured},
    session,
    freeze
  } = useApp ();
  const setty = ['default-questions', 'custom-questions', 'use-metrix', 'freeform'].map (k => getSetting (k));
  const [start, setStart] = useState (new Date ());
  const [autoFocusPrompt, setAFP] = useState ('');
  const [isSelecting, setIsSelecting] = useState ('');

  // get all prompts
  const allPrompts = () => {
    let arr = [];
    if (setty [3]) arr = [...arr, freeformPrompt];
    if (setty [0]) arr = [...arr, ...defaultPrompts.filter (p => !isCaptured (p.id))];
    if (setty [1]) arr = [...arr, ...questions];
    if (setty [2]) arr = [...arr, ...metrix.filter (p => !defaultMetrix.find (m => m.id === p.id)).filter (p => !isCaptured (p.id))];
    return arr;
  }

  useEffect (() => {
    session.clearSettings ();
    const prompts = allPrompts ().filter (p => getSetting (`starred-${p.unit}-${p.id}`));
    let all = prompts.map (p => {
      let value = null;
      if (p.unit === 'string') value = '...';
      if (p.unit === 'number') value = p.range [0];
      measure (p, value);
      return {key: p.id, value};
    });
    session.setAll (all);
  }, [metrix, questions]);

  // get active prompts
  const getActivePromts = () => {
    let rawPrompts = session.getAll ();
    let all = allPrompts ();
    let prompts = Object.keys (rawPrompts).filter (k => rawPrompts [k] !== undefined).map (id => all.find (p => p.id === id)).filter (a => a);
    prompts.sort ((a, b) => all.findIndex (p => p.id === a.id) - all.findIndex (p => p.id === b.id));
    return prompts;
  }

  // create entry
  const submit = async () => {
    let unfreeze = freeze ();
    try {
      const all = allPrompts ();
      const qa = session.getAll ();
      let questions = Object.keys (qa).filter (id => (qa [id] !== null && qa [id] !== undefined)).map (id => all.find (p => p.id === id)).filter (a => a);
      let answers = questions.map (question => qa [question.id]);
      questions = questions.map (question => {return `${question.prompt}${question.unitLabel ? ` (${question.unitLabel})` : ''}`})
      const body = {
        entryType: 'questions',
        start,
        end: new Date (),
        questions,
        answers
      }
      await createEntry (body);
      await createMeasurements ();
      session.clearSettings ()
      setStart (new Date ());
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }

  // add a prompt
  const addPromptById = id => {
    let prompt = allPrompts ().find (m => id === m.id);
    let value = null;
    if (prompt.unit === 'string') value = '...';
    if (prompt.unit === 'number') value = prompt.range [0];
    if (!prompt) return;
    session.set (prompt.id, value);
    measure (prompt, value);
    setAFP (prompt.id);
  }

  // set value of a prompt
  const onChange = (prompt, value) => {
    measure (prompt, value);
    session.set (prompt.id, value);
  }

  // remove prompt
  const removePrompt = (prompt) => {
    console.log (`remove prompt id=${prompt.id}`)
    measure (prompt, undefined);
    session.removeSetting (prompt.id);
  }

  useEffect (() => {
    if (page === 'write') {
      setAFP ('');
      scrollToTop ()
    }
  }, [page])

  // only render if authenticated & on write page
  if (!user || page !== 'write') return null;
  return (
    <main id="question-answer-entry">
      <H1 short={'New Entry'}>{'New Question & Answer Entry'}</H1>
      <H2>{printDate ()}</H2>
      <H3>{getTime (start)}</H3>
      <div className="questions">
        {
          getActivePromts ().map (prompt => {
            const Metric = MetrixType [prompt.unit];
            const dv = {
              defaultValue: session.getSetting (prompt.id)
            }
            return (
              <React.Fragment key={`prompt-${prompt.unit}-${prompt.id}`}>
                <span className={`prompt-prompt ${prompt.unit}`}>
                  <b>{prompt.prompt}{prompt.unitLabel ? ` (${prompt.unitLabel})` : ''}</b>
                  <span onClick={() => removePrompt (prompt)}><img src={TrashSVG} /></span>
                </span>
                <Metric autofocus={autoFocusPrompt === prompt.id} onChange={value => onChange (prompt, value)} {...dv} {...prompt} />
                <hr className="prompt-divider" />
              </React.Fragment>
            )
          })
        }
        {
          allPrompts ().filter (m => getActivePromts ().find (p => p.id === m.id)) !== 0 &&
          <>
            <section onClick={() => setIsSelecting ('selecting')} className={`add-a-section ${isSelecting}`}>+</section>
            <section>
              {
                isSelecting === 'selecting' &&
                <select autoFocus onChange={e => e.target.value ? (addPromptById (e.target.value) || setIsSelecting ('')) : setIsSelecting ('')}>
                  <option value={null} defaultChecked></option>
                  {
                    allPrompts ().filter (m => !getActivePromts ().find (_m => m.id === _m.id)).map (metric => (
                      <option key={`option-${prompt.unit}-${prompt.id}`} value={metric.id}>{typeDict [metric.unit]}{metric.prompt}</option>
                    ))
                  }
                </select>
              }
              <span className="fake-button" onClick={() => setIsSelecting ('')}><img src={CancelSVG} /></span>
            </section>
          </>
        }
        <div>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </main>
  )
}