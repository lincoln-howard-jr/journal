import React, { useState, useEffect } from "react";
import { useApp } from "../AppProvider";
import {MetrixType} from './components/Metrix'
import {H1, H2, H3} from './components/Headers'
import {printDate, getTime} from '../lib/indexing';
import CancelSVG from '../img/cancel.svg'
import TrashSVG from '../img/trash.svg'
import defualtPrompts from "../lib/defaultQuestions";
import defaultQuestions from "../lib/defaultQuestions";
import TimePicker from "./components/TimePicker";

export default function Write () {

  // state stuff
  const {
    auth: {user},
    router: {page},
    journal: {createEntry},
    settings: {getSetting},
    writing: {questions},
    metrix: {metrix, getMeasureValue, createMeasurements, measure, isCaptured},
    session,
    freeze
  } = useApp ();
  const setty = ['default-questions', 'custom-questions', 'use-metrix'].map (k => getSetting (k));
  const [start, setStart] = useState (new Date ());
  const [autoFocusPrompt, setAFP] = useState (defaultQuestions [0].id);
  const [isSelecting, setIsSelecting] = useState ('');

  // get all prompts
  const allPrompts = () => {
    let arr = [];
    if (setty [0]) arr = defualtPrompts;
    if (setty [1]) arr = [...arr, ...questions];
    if (setty [2]) arr = [...arr, ...metrix];
    return arr;
  }

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
      questions = questions.map (question => question.prompt)
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
    if (!prompt) return;
    session.set (prompt.id, null);
    setAFP (prompt.id);
  }

  // set value of a prompt
  const onChange = (prompt, value) => {
    measure (prompt, value);
    session.set (prompt.id, value);
  }

  // remove prompt
  const removePrompt = (prompt) => {
    measure (prompt, undefined);
    session.removeSetting (prompt.id);
  }

  useEffect (() => {
    setAFP ('');
  }, [page])

  // only render if authenticated & on write page
  if (!user || page !== 'write') return null;
  if (getSetting ('freeform')) return null;
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
              defaultValue: prompt.unit === 'string' ? (session.getSetting (prompt.id) || '...') : getMeasureValue (prompt)
            }
            return (
              <React.Fragment key={`prompt-${prompt.unit}-${prompt.id}`}>
                <span className="prompt-prompt">
                  <b>{prompt.prompt}</b>
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
                    allPrompts ().filter (m => !isCaptured (m)).filter (m => !getActivePromts ().find (_m => m.id === _m.id)).map (metric => (
                      <option key={`option-${prompt.unit}-${prompt.id}`} value={metric.id}>{metric.prompt}</option>
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