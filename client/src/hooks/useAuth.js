import {useState, useEffect} from 'react';
import {login as _login, register as _register, getCurrentUser, retrieveAccessToken, refreshSession, signOut, customFlow} from '../lib/auth';

export default function useAuth (freeze, onSessionActive) {
  // data
  const [user, setUser] = useState (null);
  const [err, setErr] = useState (null);

  // login method - gets jwt from cognito and accuires barista session from api
  const login = async (Username, cb, onCodeSent) => {
    return new Promise (async (resolve, reject) => {
      let unfreeze = freeze ();
      try {
        await customFlow (Username, cb, onCodeSent, init, setErr);
        resolve ();
        unfreeze ();
      } catch (e) {
        reject (e);
        unfreeze ();
      }
    })
  }

  // retrieve locally stored user
  const retrieveSession = async () => new Promise (async (resolve, reject) => {
    try {
      await getCurrentUser ();
      await retrieveAccessToken ();
      resolve ();
    } catch (e) {
      console.log (e);
      reject (e);
    }
  });

  // logout logs out locally
  const logout = async () => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      await signOut ();
      window.location.reload ();
      resolve ();
    } catch (e) {
      reject (e);
    } finally {
      unfreeze ();
    }
  })
  
  // init
  const init = async () => {
    try {
      await getCurrentUser ();
      await retrieveSession ();
      await refreshSession ();
      setUser (true);
    } catch (e) {
      setUser (false);
    }
  }

  const register = async (phoneNumber, cb, onCodeSent) => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      await _register (phoneNumber);
      await customFlow (phoneNumber, cb, onCodeSent, init, setErr);
      resolve ();
    } catch (e) {
      setErr (e);
      reject (e);
    } finally {
      unfreeze ();
    }
  });

  useEffect (() => {
    if (user && onSessionActive) onSessionActive ();
  }, [user]);

  useEffect (() => {
    init ();
  }, []);

  return {user, err, login, logout, register};
}