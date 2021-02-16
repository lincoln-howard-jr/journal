import lame from 'lamejs';

let audioCtx = null;
const encoder = new lame.Mp3Encoder (1, 44100, 128000);

let stream = null;
let mediaRecorder = null;
let chunks = [];
let mp3data = [];

export const getUserMedia = async () => new Promise (async (resolve, reject) => {
  try {
    stream = await window.navigator.mediaDevices.getUserMedia ({audio: true});
    resolve ();
  } catch (e) {
    reject (e)
  }
});
export const createMediaRecorder = () => {
  if (!stream) throw new Error ('no stream available to record');
  mediaRecorder = new window.MediaRecorder (stream);
  mediaRecorder.ondataavailable = evt => {
    console.log (chunks);
    chunks.push (evt.data);
  }
}
export const isReadyForRecording = () => {
  return (!!stream && !!mediaRecorder && !!chunks);
}
export const getRecorderState = () => mediaRecorder?.state;
export const start = async (offset=300) => new Promise (async (resolve, reject) => {
  try {
    audioCtx = new window.AudioContext ();
    // ensure environment ready for recording
    if (!isReadyForRecording ()) throw new Error ('Environment not set up for recording');
    setTimeout (() => {
      mediaRecorder.start ();
      resolve ();
    }, offset);
  } catch (e) {
    console.log (e);
    console.log (`
    current state:
      stream = ${stream}
      mediaRecorder = ${mediaRecorder}
      chunks = ${chunks}
    `);
  }
})
export const stop = async () => new Promise (async (resolve, reject) => {
  try {
    mediaRecorder.stop ();
    setTimeout (() => resolve (), 150);
  } catch (e) {
    reject (e);
    console.log (`
    current state:
      stream = ${stream}
      mediaRecorder = ${mediaRecorder}
      chunks = ${chunks}
    `);
  }
});
export const pause = () => {
  mediaRecorder.pause ();
}
export const resume = () => {
  mediaRecorder.resume ();
}
export const extract = async (title='recording') => new Promise (async (resolve, reject) => {
  try {
    let decoded = await audioCtx.decodeAudioData (await chunks [0].arrayBuffer ());
    console.log (decoded);
    mp3data.push (encoder.encodeBuffer (decoded.getChannelData (0).map (data => data * 10000)));
    mp3data.push (new Int8Array (encoder.flush ()));
    let file = new File (mp3data, title, {type: 'audio/mp3'});
    resolve (file);
  } catch (e) {
    reject (e);
  }
});