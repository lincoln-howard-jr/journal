import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import reportWebVitals from './reportWebVitals';
const swStatus = localStorage.getItem ('sw-status');
const install = async () => {
  try {
    if (swStatus) return;
    await navigator.serviceWorker.register (window.location.href + '/sw.js');
    localStorage.setItem ('sw-status', 'installed')
    alert ('Therapy Journal has installed!');
    window.location.reload ();
  } catch (e) {
    alert (e);
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App install={install} swStatus={swStatus} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
