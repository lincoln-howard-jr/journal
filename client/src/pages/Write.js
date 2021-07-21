import {useRef, useState} from 'react';
import {H1, H2, H3} from './components/Headers';
import AudioRecorder from './components/AudioRecorder';
import {audios as audioApi} from '../lib/auth';
import { useApp } from "../AppProvider";
import {printDate, getTime} from '../lib/indexing';

export default function Write () {
  // state mgmt
  const {auth: {user}, router: {page}, journal: {createEntry}, settings: {getSetting}, writing: {recordingStatus, resetAudioInformation}, audio: {audioRecording, audioRecordingTitle}, freeze} = useApp ();
  const [start, setStart] = useState (new Date ());
  const [focusList, setFocusList] = useState ({});
  const freeformRef = useRef ();
  
  // clear content on first focus
  const onFirstFocus = (key, text='') => e => {
    if (focusList [key]) return;
    e.target.innerText = text;
    setFocusList ({
      ...focusList,
      [key]: true
    })
  }

  // call api to create freeform entry
  const runSubmitFreeformEntry = async e => {
    let unfreeze = freeze ();
    try {
      const entry = {
        entryType: 'freeform',
        freeform: freeformRef.current.innerText,
        start,
        end: new Date ()
      }
      await createEntry (entry);
      freeformRef.current.innerText = 'Your entry here!';
      setStart (new Date ());
      unfreeze ();
    } catch (error) {
      unfreeze ();
    }
  }

  // call api to create audio entry
  const runSubmitAudioEntry = async e => {
    let unfreeze = freeze ();
    try {
      let body = {
        entryType: 'audio',
        start,
        end: new Date ()
      };
      let fileUploadResponse = await audioApi.post ({filename: audioRecordingTitle});
      let fileUpload = await fileUploadResponse.json ();
      await fetch (fileUpload.uploadUrl, {
        method: 'PUT',
        body: audioRecording
      });
      body.audio = fileUpload.id;
      body.title = audioRecordingTitle
      await createEntry (body);
      resetAudioInformation ();
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }

  // not authenticated
  if (page !== 'write' || !user) return null;

  // audio journal
  if (getSetting ('freeform', '!audio-recording')) return (
    <main id="freeform-entry">
      <H1 short={'New Entry'}>New Freeform Entry</H1>
      <H2>{printDate ()}</H2>
      <H3>{getTime (start)}</H3>
      <div onFocus={onFirstFocus ('freeform')} ref={freeformRef} contentEditable>Your entry here!</div>
      <button onClick={runSubmitFreeformEntry}>Submit</button>
    </main>
  )

  // freeform text journal
  if (getSetting ('freeform', '&audio-recording')) return (
    <main id="audio-entry">
    <H1 short={'New Entry'}>New Audio Entry</H1>
      <H2>{printDate ()}</H2>
      <H3>{getTime (start)}</H3>
      <AudioRecorder />
      {
        recordingStatus === 'finished' &&
        <button onClick={runSubmitAudioEntry}>Submit</button>
      }
    </main>
  )

  return null;
}