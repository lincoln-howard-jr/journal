import { useRef, useState } from "react";
import { useApp } from "../AppProvider";
import {H1, H3} from './components/Headers';
import sanitizePhoneNumber, {stripPhoneNumber} from '../lib/sanitizePhoneNumber';
import { logo } from "../img/images";

const fmtRawPhoneNumber = number => {
  let stripped = stripPhoneNumber (number);
  if (stripped.length > 10) stripped = stripped.substr (0, 10);
  if (stripped.length === 0) return stripped;
  if (stripped.length < 4) return `(${stripped}`;
  if (stripped.length < 7) return `(${stripped.substr (0, 3)}) ${stripped.substr (3)}`;
  return `(${stripped.substr (0, 3)}) ${stripped.substr (3, 3)}-${stripped.substr (6)}`;
}

export default function Auth () {
  // important global state
  const {auth: {user, login, register, err}} = useApp ();
  // auth flow
  const [rawPhoneNumber, _setPhoneNumber] = useState ('');
  const [prompt, setPrompt] = useState (false);
  const [answer, setAnswer] = useState (v => () => console.log (v));
  const codeRef = useRef ();
  const setPhoneNumber = (number) => _setPhoneNumber (fmtRawPhoneNumber (number));
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
      let phoneNumber = sanitizePhoneNumber (rawPhoneNumber);
      setAuthError (null);
      await register (phoneNumber, promptForCode, onCodeSent);
    } catch (e) {
      setAuthError (e);
    }
  }
  const onLogInClick = async () => {
    try {
      let phoneNumber = sanitizePhoneNumber (rawPhoneNumber);
      setAuthError (null);
      await login (phoneNumber, promptForCode, onCodeSent);
    } catch (e) {
      setAuthError (e);
    }
  }
  if (!!user) return null;
  return (
    <main>
      <H1>Your Journal</H1>
      <div className="phone-number-input">
        <H3>{codeSent ? 'Your secret code in on the way!' : 'Enter your phone number:'}</H3>
        <span style={{display: (onAuthError !== null ? 'grid' : 'none')}} className="error">{onAuthError?.message}</span>
        <span style={{display: (err !== null ? 'grid' : 'none')}} className="error">{err?.message}</span>
        <input autoComplete="tel-local" type="tel" placeholder="123-456-7890" value={rawPhoneNumber} onChange={e => setPhoneNumber (e.target.value)} disabled={!!prompt} />
        {
          prompt &&
          <div className="phone-number-input">
            <input ref={codeRef} autoComplete="one-time-code" placeholder="Secret Code" ref={codeRef} />
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
      </div>
      <div className="grid">
        <img src={logo} style={{width: 'min(35vw, 150px)'}} />
      </div>
      <section>
        <h3>About Us</h3>
        <hr/>
        <b>Why A Journal?</b>
        <p>
          Journaling provides anyone with a structure to
          deeper understand themselves and their emotional wellbeing. Oftentimes describing a situation
          or emotion in writing provides a sense of clarity not found in other ways. Also available to you is
          a place to write down skills you have learned along the way.
        </p>
        <b>How Does It Work?</b>
        <p>
          To start, register an account with your phone number. You will be texted a secret code. Enter that and...
          well that's it, you now have your very own journal!
          To put it simply, you write details about your life in your journal. Again, but in more detail, you can
          structure your journal in different ways. Journal entries are formatted as "question and answer". All journal entries automatically include the
          date and time of writing and can be found listed in chronological order.
        </p>
      </section>
      <section>
        <h3>Terms of Service</h3>
        <hr/>
        <b>Privacy</b>
        <p>
          None of your information (journal entries, metrics, skills, phone number, etc) will be publicly available
          nor will it be shared unless you explicitly share it.
        </p>
        <b>Sharing</b>
        <p>
          By nature of being a journaling application, the contained subject matter will often be sensitive
          information. With this application, you can share your journal with anyone. However, it is recommended
          for, and with intention of, sharing with medical professionals only. In the case of abuse of this feature deemed
          detrimental to the health of another individual, we retain the right to terminate your account.
        </p>
      </section>
    </main>
  );
}