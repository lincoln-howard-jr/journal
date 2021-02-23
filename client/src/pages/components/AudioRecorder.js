import { useEffect, useRef, useState } from 'react';
import {getTime, dateShortHand} from '../../lib/indexing';
import * as WebAudio from '../../lib/webaudio';

function AudioRecorder ({onChange, freeze}) {
  const [ready, setReady] = useState (false);
  const [recording, setRecording] = useState (false);
  const [timeElapsed, setTimeElapsed] = useState (0);
  const [timer, setTimer] = useState (false);
  const [file, setFile] = useState (null)
  const [title, setTitle] = useState (`${getTime ()}-${dateShortHand ()}`);
  const [isPaused, setIsPaused] = useState (false);
  useEffect (() => {
    (async () => {
      await WebAudio.getUserMedia ()
      WebAudio.createMediaRecorder ();
      setReady (WebAudio.isReadyForRecording ());
    }) ();
  }, []);
  const startRecording = async () => {
    if (isPaused) return resume ();
    await WebAudio.start ();
    setRecording (true);
    setTimer (window.setInterval (() => setTimeElapsed (time => time + 1), 1000));
  }
  const stopRecording = async () => {
    window.clearInterval (timer);
    setTimer (false);
    setRecording (false);
    setTimeElapsed (0);
    await WebAudio.stop ();
    let blob = await WebAudio.extract (freeze, `audio-recording-${getTime ()}-${dateShortHand ()}.mp3`);
    setFile (blob);
  }
  const pause = async () => {
    window.clearInterval (timer);
    setIsPaused (true);
    WebAudio.pause ();
  }
  const resume = async () => {
    setTimer (window.setInterval (() => setTimeElapsed (time => time + 1), 1000));
    setIsPaused (false);
    WebAudio.resume ();
  }
  const reset = () => () => {
    setRecording (false);
    setTimeElapsed (0);
    setTimer (false);
    setFile (null);
    setTitle (null);
  }

  useEffect (() => {
    if (onChange) onChange ({file, title, reset});
  }, [file, title]);

  const recorderRef = useRef ();

  if (!ready) return (
    <div className="none" />
  )
  return (
    <div ref={recorderRef} className="recorder-container grid text-center">
      {
        (!recording && !file) &&
        <p>Click "Record" to speak your journal entry!</p>
      }
      {
        (recording && !file) &&
        <div className="timer"><span>{Math.floor (timeElapsed / 60)}:{`00${timeElapsed % 60}`.slice (-2)}</span></div>}
      {
        ((!recording || isPaused) && !file) &&
        <div>
          <button onClick={isPaused ? resume : startRecording}>{isPaused ? 'Resume' : 'Record'}</button>
          {
            isPaused &&
            <button onClick={stopRecording}>Finish</button>
          }
        </div>
      }
      {
        ((recording && !isPaused) && !file)&&
        <>
          <div>
            <button onClick={stopRecording}>Stop</button>
            <button onClick={pause}>Pause</button>
          </div>
        </>
      }
      {
        file &&
        <>
          <figure className="audio-recording">
            <figcaption>
              <p>
                Title:&nbsp;&nbsp;&nbsp;
                <input className="audio-title-input" onChange={e => setTitle (e.target.value)} defaultValue={title} />
              </p>
              <p className="fake-button"><a className="error" onClick={reset ()}>Start Over</a></p>
            </figcaption>
            <audio controls src={window.URL.createObjectURL (file)} />
          </figure>
        </>
      }
    </div>  
  )
}

export default AudioRecorder