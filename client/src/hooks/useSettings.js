import {useState, useEffect} from 'react';

// Relationship API:
//   |setting - this or setting must be true
//   !setting - must be inverse of setting
//   &setting - must also be true
//   +setting - if setting is true, show this

export default function useSettings (defaultSettings={}, storage=window.localStorage) {
  const storedSettings = JSON.parse (storage.getItem ('therapy-journal-settings') || '{}');
  const currentSettings = Object.assign (defaultSettings, storedSettings);
  const [settings, setSettings] = useState (currentSettings);
  const [iter, setIter] = useState (0);
  const getSetting = (setting, ...relationships) => {
    if (!relationships.length) return settings [setting];
    return relationships.reduce ((acc, val) => {
      let relation = val.charAt (0);
      let affected = val.substring (1);
      if (relation === '!') return acc && !settings [affected];
      if (relation === '|') return acc || settings [affected];
      if (relation === '&') return acc && settings [affected];
      return acc;
    }, settings [setting]);
  }
  const getAll = () => {
    return Object.assign ({}, settings);
  }
  const addSetting = (setting, initial) => {
    if (settings [setting]) return;
    setSettings ({...settings, [setting]: initial});
    setIter (iter + 1);
  }
  const removeSetting = setting => {
    delete settings [setting];
    setIter (iter + 1);
  }
  const clearSettings = () => {
    setSettings ({});
    setIter (iter + 1);
  }
  const set = (setting, value, ...relationships) => {
    if (!relationships.length) return setSettings ({...settings, [setting]: value});
    let changes = relationships.reduce ((acc, val) => {
      let relation = val.charAt (0);
      let affected = val.substring (1);
      if (relation === '!') return {
        ...acc,
        [affected]: !value
      };
      if (relation === '|' && value === false) return {
        ...acc,
        [affected]: true
      };
      return acc;
    }, {[setting]: value});
    setSettings (_sett => Object.assign (_sett, changes));
    setIter (iter + 1);
  }
  const setAll = (arr=[]) => {
    let changes = arr.reduce ((acc, {key, value}) => {
      return Object.assign (acc, {[key]: value})
    }, {});
    setSettings (_sett => Object.assign (_sett, changes));
    setIter (iter + 1);
  }
  const toggle = (setting, relationships=[]) => e => {
    if (!relationships.length)  return setSettings ({...settings, [setting]: !settings[setting]})
    let to = !settings [setting];
    let changes = relationships.reduce ((acc, val) => {
      let relation = val.charAt (0);
      let affected = val.substring (1);
      if (relation === '!') return {
        ...acc,
        [affected]: !to
      };
      if (relation === '|' && to === false) return {
        ...acc,
        [affected]: true
      };
      return acc;
    }, {[setting]: to});
    setSettings ({...settings, ...changes});
    setIter (iter + 1);
  }
  useEffect (() => {
    storage.setItem ('therapy-journal-settings', JSON.stringify (settings));
  }, [settings]);

  return {getSetting, removeSetting, getAll, toggle, addSetting, set, setAll, clearSettings}
}