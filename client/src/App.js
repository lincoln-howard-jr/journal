import NavSkills from './img/skill.svg'
import NavPlus from './img/plus.svg'
import NavBook from './img/book.svg'
import NavSettings from './img/settings.svg'
import { useState, useRef } from 'react'
import useAuth from './hooks/useAuth';
import Write from './pages/Write'
import Journal from './pages/Journal'
import Skills from './pages/Skills'
import Settings from './pages/Settings'
import useSettings from './hooks/useSettings';
import useSkills from './hooks/useSkills';
import useJournal from './hooks/useJournal';
import './App.css';

const titles = {
  'write': 'Check In',
  'journal': 'Therapy Journal',
  'settings': 'Customize',
  'skills': 'Coping Skills'
}

// pending actions
let pending = JSON.parse (localStorage.getItem ('pending-actions') || '[]');
const handlePending = (actions={}) => {
  localStorage.setItem ('pending-actions', []);
  pending.forEach (({action, body}) => actions [action] (body));
}

function App({install, swStatus}) {
  // api
  const {skills, getSkills, submitSkill} = useSkills ();
  const {entries, getEntries, createEntry} = useJournal ();
  const settings = useSettings ();

  const {user, login, register, logout} = useAuth (() => {
    getSkills ();
    getEntries ();
    handlePending ({'submit-skill': submitSkill, 'create-entry': createEntry});
  });
  
  let initialPage = new URLSearchParams(window.location.search).get ('page') || 'write';
  const [page, setPage] = useState (initialPage);
  const [prompt, setPrompt] = useState (false);
  const numRef = useRef ();
  const codeRef = useRef ();
  const [answer, setAnswer] = useState (v => console.log (v));
  const promptForCode = _answer => {
    setPrompt (true);
    setAnswer (() => () => {console.log ('answering!'); _answer (codeRef.current.value)});
  }
  const [codeSent, setCodeSent] = useState (false);
  const onCodeSent = () => {
    setCodeSent (true);
  }
  const onRegisterClick = async () => {
    try {
      let raw = numRef.current.value;
      let phoneNumber = `+1${raw.replaceAll ('-', '')}`;
      await register (phoneNumber, promptForCode, onCodeSent);
    } catch (e) {

    }
  }
  const onLogInClick = async () => {
    try {
      let raw = numRef.current.value;
      let phoneNumber = `+1${raw.replaceAll ('-', '')}`;
      await login (phoneNumber, promptForCode, onCodeSent);
    } catch (e) {
    }
  }
  // loading animation
  const [loadingAnimation, setLoadingAnimation] = useState ('none');
  const freeze = () => {
    setLoadingAnimation ('grid');
    return function unfreeze () {setLoadingAnimation ('none')}
  }
  if (!user) return (
    <>
      <div id="loading-animation" style={{display: loadingAnimation}}></div>
      <header>
        <h1>Therapy Journal</h1>
      </header>
      <main>
        <h2>{codeSent ? 'code is sending!' : 'can i get ur number?'}</h2>
        <div className="phone-number-input">
          <input type="tel" placeholder="123-456-7890" ref={numRef} disabled={!!prompt} />
        </div>
        {
          prompt &&
          <div className="phone-number-input">
            <input autoComplete="one-time-code" placeholder="Secret Code" ref={codeRef} />
          </div>
        }
        <div className="phone-number-input">
          { 
            !prompt &&
            <span>
              <button onClick={onLogInClick}>Get Login Code</button>
              <button onClick={onRegisterClick}>Register</button>
            </span>
          }
          { prompt && <><button onClick={answer}>Submit!</button></> }
        </div>
      </main>
    </>
  );
  return (
    <>
      <div id="loading-animation" style={{display: loadingAnimation}}></div>
      <header>
        <h1>{titles [page]}</h1>
      </header>
      <Write createEntry={createEntry} settings={settings} user={user} freeze={freeze} display={page === 'write' ? 'grid' : 'none'} />
      <Journal entries={entries} user={user} freeze={freeze} display={page === 'journal' ? 'grid' : 'none'} />
      <Skills submitSkill={submitSkill} skills={skills} user={user} display={page === 'skills' ? 'grid' : 'none'} />
      <Settings settings={settings} logout={logout} user={user} freeze={freeze} display={page === 'settings' ? 'grid' : 'none'} install={install} swStatus={swStatus} />
      <nav>
        <ul>
          <li></li>
          <li className={page === 'skills' ? 'active' : ''} onClick={() => {setPage ('skills')}}>
            <img alt="" width="32" height="32" src={NavSkills} />
            <label>Skills</label>
          </li>
          <li className={page === 'write' ? 'active' : ''} onClick={() => {setPage ('write')}}>
            <img alt="" width="32" height="32" src={NavPlus} />
            <label>Write</label>
          </li>
          <li className={page === 'journal' ? 'active' : ''} onClick={() => {setPage ('journal')}}>
            <img alt="" width="32" height="32" src={NavBook} />
            <label>Journal</label>
          </li>
          <li className={page === 'settings' ? 'active' : ''} onClick={() => {setPage ('settings')}}>
            <img alt="" width="32" height="32" src={NavSettings} />
            <label>Settings</label>
          </li>
          <li></li>
        </ul>
      </nav>
    </>
  );
}

export default App;
