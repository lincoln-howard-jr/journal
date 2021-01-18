import {useState, useEffect} from 'react';

export default function useSettings (onSessionActive) {
  const storedSettings = localStorage.getItem ('therapy-journal-settings') || '{}';
  const [settings, setSettings] = useState (JSON.parse (storedSettings));
  const getSetting = setting => {
    return settings [setting];
  }
  const toggle = setting => e => {
    console.log (`Changing setting for ${setting} from ${settings [setting]} to ${!settings [setting]}`);
    setSettings ({...settings, [setting]: !settings[setting]})
  }
  useEffect (() => {
    localStorage.setItem ('therapy-journal-settings', JSON.stringify (settings));
  }, [settings]);

  return {getSetting, toggle}
}