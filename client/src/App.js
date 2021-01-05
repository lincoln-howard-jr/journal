import NavSkills from './img/skill.svg'
import NavPlus from './img/plus.svg'
import NavBook from './img/book.svg'
import NavSettings from './img/settings.svg'
import './App.css'
import { useState, useEffect, useRef } from 'react'
import {register, getCurrentUser, login, retrieveAccessToken, active} from './auth';
import Write from './pages/Write'
import Journal from './pages/Journal'
import Skills from './pages/Skills'

const attributions = {
  'calendar.svg': '<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>',
  'pen.svg': 'Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'book.svg': 'Icons made by <a href="https://www.flaticon.com/authors/zlatko-najdenovski" title="Zlatko Najdenovski">Zlatko Najdenovski</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'plus.svg': 'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'list.svg': 'Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'skill.svg': 'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'settings.svg': 'Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'
}

const titles = {
  write: 'Check In',
  journal: 'Therapy Journal',
  settings: 'Customize',
  skills: 'Coping Skills'
}

function App({install, swStatus}) {
  const [page, setPage] = useState ('write');
  const [loggedIn, setLoggedIn] = useState (null);
  const login_fn = async () => {
    try {
      await getCurrentUser ()
      await retrieveAccessToken ();
      setLoggedIn (true);
    } catch (e) {
      setLoggedIn (false);
    }
  }

  useEffect (() => {
    setLoggedIn (!!active)
  }, [active])

  useEffect (() => {
    login_fn ()
  }, []);

  const numRef = useRef ();
  const pwdRef = useRef ();
  const onLogInClick = () => {
    let passwd = pwdRef.current.value;
    let raw = numRef.current.value;
    let phoneNumber = `+1${raw.replaceAll ('-', '')}`;
    login (phoneNumber, passwd);
  }
  const onRegisterClick = () => {
    let passwd = pwdRef.current.value;
    let raw = numRef.current.value;
    let phoneNumber = `+1${raw.replaceAll ('-', '')}`;
    register (phoneNumber, passwd);
  }
  if (!loggedIn) return (
    <>
      <header>
        <h1>Therapy Journal</h1>
      </header>
      <main>
        <h2>can i get ur number?</h2>
        <div>
          <input ref={numRef} />
          <p>(and password)</p>
          <input type="password" ref={pwdRef} />
        </div>
        <div><button onClick={onLogInClick}>Log In</button><button onClick={onRegisterClick}>Register</button></div>
      </main>
    </>
  );
  return (
    <>
    <header>
      <h1>{titles [page]}</h1>
      {!swStatus && <button onClick={install}>Install!</button>}
    </header>
    <Write display={page === 'write' ? 'grid' : 'none'} />
    <Journal display={page === 'journal' ? 'grid' : 'none'} />
    <Skills display={page === 'skills' ? 'grid' : 'none'} />
    <nav>
      <ul>
        <li></li>
        <li className={page === 'calendar' ? 'active' : ''} onClick={() => {setPage ('skills')}}>
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
    <div id="attributions">
      <h2>Attributions</h2>
      <ul>
        {Object.keys (attributions).map (k => (
          <li key={`attribiution-${k}`}>{k} - {attributions [k]}</li>
        ))}
      </ul>
    </div>
  </>
  );
}

export default App;
