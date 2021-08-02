import { useRef, useState } from "react";
import { useApp } from "../AppProvider";
import {H1} from './components/Headers';
import sanitizePhoneNumber, {stripPhoneNumber} from '../lib/sanitizePhoneNumber';

const fmtRawPhoneNumber = number => {
  let stripped = stripPhoneNumber (number);
  if (stripped.length > 10) stripped = stripped.substr (0, 10);
  console.log (stripped);
  if (stripped.length === 0) return stripped;
  if (stripped.length < 4) return `(${stripped}`;
  if (stripped.length < 7) return `(${stripped.substr (0, 3)}) ${stripped.substr (3)}`;
  return `(${stripped.substr (0, 3)}) ${stripped.substr (3, 3)}-${stripped.substr (6)}`;
}

export default function Auth () {
  // important global state
  const {auth: {user, login, register}} = useApp ();
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
      await register (phoneNumber, promptForCode, onCodeSent);
      setAuthError (null);
    } catch (e) {
      setAuthError (e);
    }
  }
  const onLogInClick = async () => {
    try {
      let phoneNumber = sanitizePhoneNumber (rawPhoneNumber);
      await login (phoneNumber, promptForCode, onCodeSent);
      setAuthError (null);
    } catch (e) {
      setAuthError (e);
    }
  }
  if (!!user) return null;
  return (
    <>
      <header>
        <H1>Your Journal</H1>
      </header>
      <main>
        <div className="grid">
          <h3>{codeSent ? 'Your secret code in on the way!' : 'Enter your phone number:'}</h3>
          <span style={{display: (onAuthError !== null ? 'grid' : 'none')}} className="error">{onAuthError?.message}</span>
        </div>
        <div className="phone-number-input">
          <input autoComplete="tel-local" type="tel" placeholder="123-456-7890" value={rawPhoneNumber} onChange={e => setPhoneNumber (e.target.value)} disabled={!!prompt} />
        </div>
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
        <section>
          <h3>About Us</h3>
          <hr/>
          <b>Why A Journal?</b>
          <p>
            Journaling provides anyone with a structure to
            deeper understanding of themselves and their emotional wellbeing. Oftentimes describing a situation
            or emotion in writing provides a sense of clarity not found in other ways. Also available to you is
            a place to write down and sort skills you have learned.
          </p>
          <b>How Does It Work?</b>
          <p>
            To start, register an account with your phone number. You will be texted a secret code. Enter that and...
            well that's it, you now have your very own journal!
            To put it simply, you write details about your life in your journal. Again, but in more detail, you can
            structure your journal in different ways. Journal entries can be formatted as "question and answer" or as "freeform
            writing" or "audio journaling" (this is easily switched with one click in the settings tab). All journal entries automatically include the
            date and time of writing and can be found listed in chronological order. You also can curate a
            list of skills for different situations and share your journal if need be.
          </p>
        </section>
        <section>
          <h3>Terms of Service</h3>
          <hr/>
          <b>Privacy</b>
          <p>
            None of your information (journal entries, coping skills, phone number, etc) will be publicly available
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
    </>
  );
}