import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppProvider from './AppProvider';
// import {isAlive} from './lib/keepAlive';

console.warn = () => {}
console.error = () => {}
// import reportWebVitals from './reportWebVitals';
// let passthrough = !navigator.onLine && isAlive;

// (async () => {await navigator.serviceWorker.register ('/journal/sw.js', {scope: '/journal/'});}) ()

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
