import { useEffect } from 'react';
import { useApp } from '../../AppProvider';

function AudioRecorder () {
  const {audio: {
    initAudio,
    ready,
    recordingStatus,
    audioRecording,
    timeElapsed,
    audioRecordingTitle,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetAudioInformation,
    setAudioRecordingTitle
  }} = useApp ();

  useEffect (() => {
    if (!ready) initAudio ();
  }, []);

  if (ready === null) return null;
  if (recordingStatus === 'not-started') return (
    <div className="recorder-container grid text-center">
      <p>Click "Record" to speak your journal entry!</p>
      <button onClick={startRecording}>Record</button>
    </div>
  )
  if (recordingStatus === 'paused') return (
    <div className="recorder-container grid text-center">
      <div className="timer"><span>{Math.floor (timeElapsed / 60)}:{`00${timeElapsed % 60}`.slice (-2)}</span></div>
      <div>
        <button onClick={resumeRecording}>Resume</button>
        <button onClick={stopRecording}>Finish</button>
      </div>
    </div>
  )
  if (recordingStatus === 'recording') return (
    <div className="recorder-container grid text-center">
      <div className="timer flashing"><span>{Math.floor (timeElapsed / 60)}:{`00${timeElapsed % 60}`.slice (-2)}</span></div>
      <div>
        <button onClick={stopRecording}>Stop</button>
        <button onClick={pauseRecording}>Pause</button>
      </div>
    </div>
  )
  if (recordingStatus === 'finished') return (
    <div className="recorder-container grid text-center">
      <figure className="audio-recording">
        <figcaption>
          <p>
            Title:&nbsp;&nbsp;&nbsp;
            <input className="audio-title-input" onChange={e => setAudioRecordingTitle (e.target.value)} value={audioRecordingTitle} />
          </p>
          <p className="fake-button"><a className="error" onClick={resetAudioInformation}>Start Over</a></p>
        </figcaption>
        <audio controls src={window.URL.createObjectURL (audioRecording)} />
      </figure>
    </div>
  )
  return (
    <div>Error! Error!</div>
  )
}
export default AudioRecorder