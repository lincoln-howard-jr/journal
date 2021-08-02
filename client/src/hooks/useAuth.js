import {useState, useEffect} from 'react';
import {login as _login, register as _register, getCurrentUser, retrieveAccessToken, refreshSession, signOut, customFlow} from '../lib/auth';
import {keepAlive, cancelKeepAlive} from '../lib/keepAlive';

export default function useAuth (onSessionActive) {
  // data
  const [user, setUser] = useState (null);
  const [err, setErr] = useState (null);

  // login method - gets jwt from cognito and accuires barista session from api
  const login = async (Username, cb, onCodeSent) => {
    return new Promise (async (resolve, reject) => {
      try {
        await customFlow (Username, cb, onCodeSent);
        await retrieveAccessToken ();
        keepAlive ();
        setUser (true);
        resolve ();
      } catch (e) {
        reject (e);
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
      reject (e);
    }
  });

  // logout logs out locally
  const logout = async () => new Promise (async (resolve, reject) => {
    try {
      await signOut ();
      cancelKeepAlive ();
      window.location.reload ();
      resolve ();
    } catch (e) {
      reject (e);
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
      console.log (e);
      setUser (false);
    }
  }

  const register = async (phoneNumber, cb, onCodeSent) => new Promise (async (resolve, reject) => {
    try {
      await _register (phoneNumber);
      await login (phoneNumber, cb, onCodeSent);
      setUser (true);
      resolve ();
    } catch (e) {
      setErr (e);
      reject (e);
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