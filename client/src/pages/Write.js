import { useRef, useState } from "react"
import AudioRecorder from "./components/AudioRecorder";
import {H2, H3} from './components/Headers';
import { audios as audioApi } from "../auth";
import {printDate, getTime} from '../lib/indexing';

let defaultQuestions = [
  'What have I done today?',
  'How do I feel?',
  'What else am I going to do?'
];

function CustomQuestionSetting ({question, onToggle, getSetting}) {
  return (
    <li className="setting">
      <div>{question}</div>
      <div><span onClick={onToggle (`show-custom-question-${question}`)} className={getSetting (`show-custom-question-${question}`) ? 'toggle on' : 'toggle'} /></div>
    </li>
  )
}

function Write ({questions, display, freeze, settings, createEntry}) {
  // hooks
  const {getSetting, addSetting, toggle} = settings;
  // necessary state for Write
  const [start, setStart] = useState (new Date ());
  const [newQuestionDialog, setNewQuestionDialog] = useState (false); // whether or not to show the new question dialog
  const [recordingFile, setRecording] = useState ([]); // the file the user created
  const [recordingTitle, setRecordingTitle] = useState ([]); // the user set title of the recording passed up from AudioRecorder
  const [resetAudios, setReset] = useState (new Function ()); // function passed up from AudioRecorder 
  const [focusList, setFocusList] = useState ({});
  // refs
  const qaRef = useRef (); // question container
  const ffRef = useRef (); // freeform editor 
  const addQuestionRef = useRef (); // question input
  // methods

  // clear content on first focus
  const onFirstFocus = (key, text='') => e => {
    if (focusList [key]) return;
    e.target.innerText = text;
    setFocusList ({
      ...focusList,
      [key]: true
    })
  }

  // create question from current state
  const addQuestion = async () => {
    let q = addQuestionRef.current.innerText;
    if (q === '...?' || q.trim () === '') return;
    addQuestionRef.current.innerText = '...?';
    await questions.createQuestion (q);
    addSetting (`show-custom-question-${q}`, true);
    setNewQuestionDialog (false);
  }

  // update state when the audio recorder changes
  const onAudioRecorderChange = state => {
    setRecording (state.file);
    setRecordingTitle (state.title);
    setReset (state.reset);
  }
  
  // upload a file
  const uploadFile = async (filename, file) => new Promise (async (resolve, reject) => {
    try {
      let fileUploadResponse = await audioApi.post ({filename});
      let fileUpload = await fileUploadResponse.json ();
      let response = await fetch (fileUpload.uploadUrl, {
        method: 'PUT',
        body: file
      });
      if (!response.ok) throw new Error ('failed to upload')
      resolve (fileUpload.id);
    } catch (e) {
      reject (e);
    }
  })
  
  // call onclick of complete
  const complete = async () => {
    let unfreeze = freeze ();
    let entryType = getSetting ('freeform', '!audio-recording') ? 'freeform' : getSetting ('freeform', '&audio-recording') ? 'audio' : 'questions';
    let body = {start, end: new Date (), entryType};
    try {
      if (body.entryType === 'audio') {
        body.audio = await uploadFile (recordingTitle, recordingFile);
        resetAudios ();
      } else if (body.entryType === 'questions') {
        body.questions = Array.from (qaRef.current.querySelectorAll ('b')).map (el => el.innerText);
        body.answers = Array.from (qaRef.current.querySelectorAll ('div')).map (el => el.innerText);
      } else {
        body.freeform = ffRef.current.innerText;
      }
      await createEntry (body);
      setStart (new Date ());
      if (body.entryType === 'questions') Array.from (qaRef.current.querySelectorAll ('div')).map (el => el.innerText = '...');
      if (body.entryType === 'freeform') ffRef.current.innerText = 'Write your entry here!';
      unfreeze ();
    } catch (e) {
      if (body.entryType === 'questions') Array.from (qaRef.current.querySelectorAll ('div')).map (el => el.innerText = '...');
      if (body.entryType === 'freeform') ffRef.current.innerText = 'Write your entry here!';
      unfreeze ();
    }
  }
  // rendering
  // Add A Question
  if (newQuestionDialog) return (
    <main className={display}>
      <H2>Default Questions</H2>
      <ul className="current-question-list">
        {
          defaultQuestions.map (q => <li className="manage-default-question" key={`manage-default-questions-${q}`}>{q}</li>)
        }
      </ul>
      <H2>Custom Questions</H2>
      <ul className="current-question-list">
        {
          questions.questions.map (q => (<CustomQuestionSetting question={q} onToggle={toggle} getSetting={getSetting} />))
        }
      </ul>
      <h2>Add A Custom Question?</h2>
      <h4>Add Question</h4>
      <b ref={addQuestionRef} className="add-question-input" contentEditable>...?</b>
      <div>
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={() => setNewQuestionDialog (false)}>Back To Writing</button>
      </div>
    </main>
  )
  // otherwise the default writing editor
  return (
    <main className={display}>
      <H2>{printDate ()}</H2>
      <H3>{getTime (start)}</H3>
      {
        getSetting ('default-questions', '|custom-questions', '!freeform') &&
        <div ref={qaRef} className="questions">
          {
            getSetting ('default-questions') && defaultQuestions.map (question => (
              <>
                <b>{question}</b>
                <div onFocus={onFirstFocus (question)} contentEditable>...</div>
              </>
            ))
          }
          {
            getSetting ('custom-questions') && (
              <>
                {
                  questions.questions.filter (q => getSetting (`show-custom-question-${q}`)).map (question => (
                    <>
                      <b>{question}</b>
                      <div onFocus={onFirstFocus (question)} contentEditable>...</div>
                    </>
                  ))
                }
                <span className="fake-button" onClick={() => setNewQuestionDialog (true)}>
                  Manage Custom Question
                </span>
              </>
            )
          }
        </div>
      }
      {
        getSetting ('freeform', '!audio-recording') &&
        <>
          <div onFocus={onFirstFocus ('freeform')} className="freeform" contentEditable ref={ffRef}>Write your entry here!</div>
        </>
      }
      {
        getSetting ('freeform', '&audio-recording') &&
        <>
          <AudioRecorder onChange={onAudioRecorderChange} />
        </>
      }
      <button onClick={complete}>Complete</button>
    </main>
  )
}

export default Write