import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.warn = () => {}
console.error = () => {}
// import reportWebVitals from './reportWebVitals';
const swStatus = localStorage.getItem ('sw-status');
let passthrough = !navigator.onLine && swStatus;
if (swStatus) {
  window.addEventListener ('online', e => {
    navigator.serviceWorker.startMessages ({online: true});
  });
  window.addEventListener ('offline', e => {
    navigator.serviceWorker.startMessages ({online: true});
  });
}
const install = async () => {
  try {
    if (swStatus) return;
    await navigator.serviceWorker.register ('/journal/sw.js', {scope: '/journal/'});
    localStorage.setItem ('sw-status', 'installed')
    alert ('Therapy Journal has installed!');
    window.location.reload ();
  } catch (e) {
  }
}

const uninstall = () => {
  localStorage.removeItem ('sw-status')
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister ()
    }
    window.location.reload ();
  })

}

ReactDOM.render(
  <React.StrictMode>
    <App install={install} uninstall={uninstall} passthrough={passthrough} swStatus={swStatus} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
