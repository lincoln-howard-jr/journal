import NavSkills from './img/skill.svg'
import NavPlus from './img/plus.svg'
import NavBook from './img/book.svg'
import NavSettings from './img/settings.svg'
import { useState, useRef, useEffect } from 'react'
import useAuth from './hooks/useAuth';
import Write from './pages/Write'
import Journal from './pages/Journal'
import Skills from './pages/Skills'
import Settings from './pages/Settings'
import { H1 } from './pages/components/Headers'
import useSettings from './hooks/useSettings';
import useSkills from './hooks/useSkills';
import useJournal from './hooks/useJournal';
import SharedWithMe from './pages/SharedWithMe'
import useSharing from './hooks/useSharing'
import useQuestions from './hooks/useQuestions'
import titles from './lib/titles'
import base from './lib/base'
import sanitizePhoneNumber from './lib/sanitizePhoneNumber'
import defaultSettings from './lib/defaultSettings';
import handlePending from './lib/pendingActions'
import './App.css';
import { scrollToTop } from './lib/scrolling'
import { hasBrowserSupport } from './lib/webaudio'

function App({install, uninstall, swStatus, passthrough}) {
  // api
  const {skills, getSkills, submitSkill} = useSkills ();
  const {entries, getEntries, createEntry} = useJournal ();
  const sharing = useSharing ();
  const settings = useSettings (defaultSettings);
  const session = useSettings ({}, sessionStorage);
  const questions = useQuestions ();
  // initialize after session is activated
  const onAuth = () => {
    getSkills ();
    getEntries ();
    sharing.getShares (({sharedByMe}) => {
      sharedByMe.forEach (share => {
        settings.set (`share-${share.id}`, !share.frozen);
      });
    });
    if (!hasBrowserSupport) {
      settings.set ('audio-recording-supported', false);
      settings.set ('audio-recording', false);
    } else {
      settings.set ('audio-recording-supported', true);
    }
    questions.getQuestions ();
    handlePending ({'submit-skill': submitSkill, 'create-entry': createEntry});
  }
  const {user, login, register, logout} = useAuth (onAuth);
  if (passthrough) onAuth ();
  // router section
  let initialPage = new URLSearchParams (window.location.search).get ('page') || 'write';
  const [page, setPage] = useState (initialPage);
  const [pageData, setPageData] = useState ('');
  useEffect (() => {
    if (page === 'sharing') setPageData (new URLSearchParams (window.location.search).get ('name'));
  }, [page]);
  const redirect = (url) => {
    let arr = url.split ('?');
    let nextPage = arr.length > 1 ? new URLSearchParams (`?${arr [1]}`).get ('page') : 'write';
    window.history.pushState ({previous: page, next: nextPage}, 'Journal', `${base}${url}`)
    setPage (nextPage);
    scrollToTop (100);
  }
  // auth flow
  const [prompt, setPrompt] = useState (false);
  const numRef = useRef ();
  const codeRef = useRef ();
  const [answer, setAnswer] = useState (v => console.log (v));
  const promptForCode = _answer => {
    setPrompt (true);
    setAnswer (() => () => {_answer (codeRef.current.value)});
    codeRef.current.focus ();
  }
  const [codeSent, setCodeSent] = useState (false);
  const [onAuthError, setAuthError] = useState (null);
  const onCodeSent = () => {
    setCodeSent (true);
  }
  const onRegisterClick = async () => {
    try {
      let raw = numRef.current.value;
      let phoneNumber = sanitizePhoneNumber (raw);
      await register (phoneNumber, promptForCode, onCodeSent);
    } catch (e) {
      setAuthError (e);
    }
  }
  const onLogInClick = async () => {
    try {
      let raw = numRef.current.value;
      let phoneNumber = sanitizePhoneNumber (raw);
      await login (phoneNumber, promptForCode, onCodeSent);
    } catch (e) {
      setAuthError (e);
    }
  }
  // loading animation
  const [loadingAnimation, setLoadingAnimation] = useState ('none');
  const freeze = () => {
    setLoadingAnimation ('grid');
    return function unfreeze () {setLoadingAnimation ('none')}
  }
  // not logged in
  if (!user && !passthrough) return (
    <>
      <div id="loading-animation" style={{display: loadingAnimation}}></div>
      <header>
        <H1>Your Journal</H1>
      </header>
      <main>
        <div className="grid">
          <h3>{codeSent ? 'Your secret code in on the way!' : 'Enter your phone number:'}</h3>
          <span style={{display: (onAuthError !== null ? 'grid' : 'none')}} className="error">{onAuthError?.message}</span>
        </div>
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
              <button onClick={onLogInClick}>Login</button>
              <button onClick={onRegisterClick}>Register</button>
            </span>
          }
          { prompt && <><button onClick={answer}>Submit!</button></> }
        </div>
        <section>
          <h3>About Us</h3>
          <hr style={{width: '35%'}}/>
          <b>Why A Journal?</b>
          <p>
            Throughout our experiences as individuals with mental illness, we have discovered the benefit of
            journaling. These benefits are not limited to those with mental illness, providing anyone with a
            deeper understanding of themselves and their emotional wellbeing. Oftentimes describing a situation
            or emotion in writing provides a sense of clarity not found in other ways. Also available to you is
            a place to write down and sort coping skills you have learned. 
          </p>
          <b>How Does It Work?</b>
          <p>
            To start, register an account with your phone number. You will be texted a secret code. Enter that and...
            well that's it, you now have your very own therapy journal!
            To put it simply, you write details about your life in your journal. Again, but in more detail, you can
            structure your journal in different ways. Journal entries can be formatted as "question and answer" or as "freeform
            writing" (this is easily switched with one click in the settings tab). All journal entries include the date
            and time of writing automatically and can be found listed in chronological order. You also can curate a
            list of coping skills for different situations and share your journal if need be.
          </p>
        </section>
        <section>
          <h3>Terms of Service</h3>
          <hr style={{width: '35%'}}/>
          <b>Privacy</b>
          <p>
            None of your information (journal entries, coping skills, phone number, etc) will be publicly available
            nor will it be shared unless you explicitly share it.
          </p>
          <b>Sharing</b>
          <p>
            By nature of being a Therapy Journal application, the contained subject matter will often be sensitive
            information. With this application, you can share your journal with anyone. However, it is recommended
            for, and with intention of, sharing with medical professionals only. In the case of abuse of this feature deemed
            detrimental to the health of another individual, we retain the right to terminate your account.
          </p>
        </section>
      </main>
    </>
  );
  return (
    <>
      <div id="loading-animation" style={{display: loadingAnimation}}></div>
      <header>
        <H1 short={titles (page).short (pageData)}>{titles (page).long (pageData)}</H1>
      </header>
      <Write session={session} questions={questions} createEntry={createEntry} settings={settings} user={user} freeze={freeze} display={page === 'write' ? 'grid' : 'none'} />
      <Journal redirect={redirect} entries={entries} user={user} freeze={freeze} display={page === 'journal' ? 'grid' : 'none'} />
      <Skills submitSkill={submitSkill} skills={skills} user={user} display={page === 'skills' ? 'grid' : 'none'} />
      <Settings freeze={freeze} redirect={redirect} settings={settings} {...sharing} logout={logout} user={user} freeze={freeze} display={page === 'settings' ? 'grid' : 'none'} install={install} swStatus={swStatus} uninstall={uninstall} />
      <SharedWithMe {...sharing} display={page === 'sharing' ? 'grid' : 'none'} shareId={new URLSearchParams (window.location.search).get ('id')} name={new URLSearchParams (window.location.search).get ('name')}/>
      <nav>
        <ul>
          <li></li>
          <li className={page === 'skills' ? 'active' : ''} onClick={() => {redirect (`/?page=skills`)}}>
            <img alt="" width="32" height="32" src={NavSkills} />
            <label>Skills</label>
          </li>
          <li className={page === 'write' ? 'active' : ''} onClick={() => {redirect (`/?page=write`)}}>
            <img alt="" width="32" height="32" src={NavPlus} />
            <label>Write</label>
          </li>
          <li className={page === 'journal' ? 'active' : ''} onClick={() => {redirect (`/?page=journal`)}}>
            <img alt="" width="32" height="32" src={NavBook} />
            <label>Journal</label>
          </li>
          <li className={page === 'settings' ? 'active' : ''} onClick={() => {redirect (`/?page=settings`)}}>
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