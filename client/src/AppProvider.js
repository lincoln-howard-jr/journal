// create a context usable across the whole application
import React, { createContext, useState } from "react";
import hooks from './hooks';
import {settingMap as defaultQuestions} from "./lib/defaultQuestions";
import defaultSettings from './lib/defaultSettings';
import {hasBrowserSupport} from './lib/webaudio'
// react context api
const AppContext = createContext ();
export const useApp = () => React.useContext (AppContext);

// the component
export default function AppProvider ({children}) {

  // value used in the ctx
  const value = {}

  // freeze/unfreeze animation
  const [frozen, setFrozen] = useState (null);
  value.freeze = message => {
    setFrozen (message='');
    return function unfreeze () {
      setFrozen (null);
    }
  }

  // modal
  const [modal, setModal] = useState (null);
  value.closeModal = () => setModal (null);
  value.setModal = setModal;

  // view only mode for shared journals
  const [isViewOnly, setIsViewOnly] = useState (false);
  const [scope, setScope] = useState ([]);
  value.viewMode = {isViewOnly, setIsViewOnly, scope};

  // instantiate hooks
  value.settings = hooks.useSettings (defaultSettings);
  value.session = hooks.useSettings (defaultQuestions, sessionStorage);
  value.skills = hooks.useSkills (value.freeze);
  value.journal = hooks.useJournal (value.freeze);
  value.sharing = hooks.useSharing (value.freeze, value.settings);
  value.writing = hooks.useWriting (value.freeze);
  value.metrix = hooks.useMetrix (value.freeze);
  value.router = hooks.useRouter (value.freeze);
  value.audio = hooks.useAudio (value.freeze);
  value.notifications = hooks.useNotifications (value.freeze);

  // switch to viewing a shared journal
  value.viewSharedJournal = (id, share) => {
    let scope = (share.shareScope ? [...share.shareScope] : ['skills', 'journal', 'metrix']);
    if (scope.indexOf ('journal') >= 0 && scope.indexOf ('metrix') >= 0) scope.push ('dashboard');
    setScope (scope);
    if (!scope || scope.indexOf ('journal') !== '-1') {
      value.journal.getEntries (id);
    }
    if (scope || scope.indexOf ('skills') !== '-1') value.skills.getSkills (id);
    if (scope || scope.indexOf ('metrix') !== '-1') {
      value.metrix.getMetrix (id);
      value.metrix.getMeasurements (id);
    }
    value.viewMode.setIsViewOnly (true);
    value.router.redirect (`/?page=${(scope.indexOf ('journal') > -1 ? 'journal' : scope [0])}`)
  }
  value.viewMyJournal = () => {
    value.journal.getEntries ();
    value.skills.getSkills ();
    value.metrix.getMetrix ();
    value.metrix.getMeasurements ();
    value.viewMode.setIsViewOnly (false);
    value.router.redirect ('/?page=settings');
  }

  // after log in initialize all the stuff
  const onAuth = () => {
    value.metrix.getMetrix ();
    value.metrix.getMeasurements ();
    value.skills.getSkills ();
    value.writing.getQuestions ();
    value.journal.getEntries ();
    value.sharing.getShares (({sharedByMe}) => {
      sharedByMe.forEach (share => {
        value.settings.set (`share-${share.id}`, !share.frozen);
      });
    });
    value.notifications.getNotifications ();
    if (!hasBrowserSupport) {
      value.settings.set ('audio-recording-supported', false);
      value.settings.set ('audio-recording', false);
    } else {
      value.settings.set ('audio-recording-supported', true);
      value.settings.set ('audio-recording', false);
    }
  }

  // auth hook
  value.auth = hooks.useAuth (value.freeze, onAuth);

  // just wrap the whole app component in this
  return (
    <AppContext.Provider value={value} >
      {
        frozen !== null &&
        <div id="loading-animation"></div>
      }
      {
        modal !== null &&
        <div id="modal-backdrop">
          <div id="modal-content">
            {modal}
          </div>
        </div>
      }
      {children}
    </AppContext.Provider>
  )
}