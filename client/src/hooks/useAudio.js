import {getTime, dateShortHand} from '../lib/indexing';
import * as WebAudio from '../lib/webaudio';
import { useState } from "react";

export default function useAudio (freeze) {
  // statful stuff
  const [recordingStatus, setRecordingStatus] = useState ('not-started');
  const [audioRecording, setAudioRecording] = useState (null);
  const [audioRecordingTitle, setAudioRecordingTitle] = useState (`audio-recording-${getTime ()}-${dateShortHand ()}.mp3`);
  const [timeElapsed, setTimeElapsed] = useState (0);
  const [timer, setTimer] = useState (false);
  const [ready, setReady] = useState (null);

  // reset all audio recording stuff
  const resetAudioInformation = () => {
    setAudioRecording (null);
    setAudioRecordingTitle (`audio-recording-${getTime ()}-${dateShortHand ()}.mp3`);
    setTimeElapsed (0);
    setRecordingStatus ('not-started');
    setTimer (false);
  }
  // start recording audio
  const startRecording = async () => {
    await WebAudio.start ();
    setRecordingStatus ('recording');
    setTimer (window.setInterval (() => setTimeElapsed (time => time + 1), 1000));
  }
  // end the recording and extract the audio
  const stopRecording = async () => {
    window.clearInterval (timer);
    setTimer (false);
    setTimeElapsed (0);
    await WebAudio.stop ();
    let file = await WebAudio.extract (freeze, `audio-recording-${getTime ()}-${dateShortHand ()}.mp3`);
    console.log (file);
    setAudioRecording (file);
    setRecordingStatus ('finished');
  }
  // pause the recording, do not end
  const pauseRecording = async () => {
    window.clearInterval (timer);
    setRecordingStatus ('paused');
    WebAudio.pause ();
  }
  // resume the recording
  const resumeRecording = async () => {
    setTimer (window.setInterval (() => setTimeElapsed (time => time + 1), 1000));
    setRecordingStatus ('recording');
    WebAudio.resume ();
  }
  // ensure web-audio is ready
  const initAudio = async () => {
    let unfreeze = freeze ();
    try {
      await WebAudio.getUserMedia ()
      WebAudio.createMediaRecorder ();
      setReady (WebAudio.isReadyForRecording ());
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }

  return {initAudio, audioRecording, audioRecordingTitle, timeElapsed, recordingStatus, ready, startRecording, stopRecording, pauseRecording, resumeRecording, resetAudioInformation, setAudioRecordingTitle};
}