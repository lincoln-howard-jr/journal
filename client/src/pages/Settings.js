import React, { Children, useRef, useState } from "react";
import {H1, H2, H3} from "./components/Headers";
import attributions from '../lib/attributions'
import {useApp} from '../AppProvider';
import CaretSVG from '../img/caret-down.svg';
import CustomQuestion from "./components/CustomQuestions";
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

function ShareJournal () {
  const {sharing: {shareJournal}, settings} = useApp ();
  const [rawPhoneNumber, _setPhoneNumber] = useState ('');
  const setPhoneNumber = (number) => _setPhoneNumber (fmtRawPhoneNumber (number));
  const nameRef = useRef ();
  const swnRef = useRef ();
  const onClick = async () => {
    let phone = rawPhoneNumber;
    phone = sanitizePhoneNumber (phone);
    let name = nameRef.current.value;
    let shareWithName = swnRef.current.value;
    await shareJournal (phone, name, shareWithName);
    _setPhoneNumber ('');
    swnRef.current.value = '';
  }
  return (
    <div className="action">
      <b style={{textDecoration: 'none'}}>Share Your Journal With</b>
      <br/>
      <input ref={swnRef} placeholder="James Allen" />
      <br/>
      <input type="tel" placeholder="123-456-7890" value={rawPhoneNumber} onChange={e => setPhoneNumber (e.target.value)} />
      <br/>
      <b style={{textDecoration: 'none'}}>Your Name</b>
      <br/>
      <input ref={nameRef} />
      <br />
      <button onClick={onClick}>Share Your Journal</button>
    </div>
  )
}

function SharedByMe () {
  const {settings: {getSetting}, sharing: {sharedByMe, toggleFreeze, updateShareScope}} = useApp ();

  const toggle = (share) => () => {
    toggleFreeze (share.id);
  }
  const toggleScope = (share, type) => () => {
    if (share.shareScope && share.shareScope.indexOf (type) !== -1) {
      updateShareScope (share.id, share.shareScope.filter (a => a !== type));
    } else {
      updateShareScope (share.id, [...(share.shareScope || []), type]);
    }
  }
  return (
    <div>
      <b style={{textDecoration: 'none'}}>Who You Share Your Journal With</b>
      <hr/>
      {
        sharedByMe.length === 0 &&
        <span style={{textDecoration: 'none'}}>You haven't shared your journal - no pressure</span>
      }
      {
        sharedByMe.map (share => (
          <React.Fragment key={`share-${share.id}`}>
            <>
              <H2>{share.shareWithName || share.shareWith}</H2>
              {
                getSetting (`share-${share.id}-frozen`) &&
                ['skills', 'journal', 'metrix'].map (type => (
                  <>
                    <Setting onToggle={toggleScope (share, type)} title={`Share ${type}`} setting={`share-${share.id}-scope-${type}`} />
                    <br />
                  </>
                ))
              }
              <Setting onToggle={toggle (share)} title={'Is frozen'} setting={`share-${share.id}-frozen`} />
            </>
            <br/>
          </React.Fragment>
        ))
      }
    </div>
  );
}

function SharedWithMe () {
  const {sharing: {sharedWithMe}, viewSharedJournal} = useApp ();
  let shares = sharedWithMe.filter (share => !share.frozen);
  if (shares.length === 0) return (<div className="none" />)
  return (
    <div className="action">
      <b style={{textDecoration: 'none'}}>Journals Shared With You</b>
      <hr style={{width: '25vw'}}/>
      {
        shares.map (share => (
          <React.Fragment key={`share-${share.id}`}>
            <span onClick={() => viewSharedJournal (share.userId, share)}>{share.name}</span>
            <br />
          </React.Fragment>
        ))
      }
    </div>
  )
}

export function SettingGroup ({longTitle, shortTitle, children}) {
  const [open, setOpen] = useState (false);
  return (
    <div className={'setting-group' + (open ? ' open' : '')}>
      <header onClick={() => setOpen (!open)}>
        <span />
        <H3 short={shortTitle}>{longTitle}</H3>
        <span><img src={CaretSVG} /></span>
      </header>
      {Children.map (children, child => child && (
        <>
          {React.cloneElement(child, {open})}
        </>
      ))}
      <div></div>
    </div>
  )
}

export function Setting ({setting, title, relationships=[], onToggle}) {
  const {settings: {getSetting, toggle}} = useApp ();
  let show = relationships.reduce ((acc, val) => {
    if (!acc) return acc;
    let relation = val.charAt (0);
    if (relation !== '+') return acc;
    let affector = val.substring (1);
    return getSetting (affector);
  }, true);
  if (!show) return (
    <div className="none" />
  )
  return (
    <div className="setting">
      <div><b>{title}</b></div>
      <div><span onClick={onToggle ? onToggle : toggle (setting, relationships)} className={getSetting (setting) ? 'toggle on' : 'toggle'} /></div>
    </div>
  )
}

function Settings () {
  const {router: {page}, settings: {getSetting, iter}, auth: {user, logout}} = useApp ();
  const [attributionId, setAttributionId] = useState ('attributions');
  if (!user) return null;
  return page === 'settings' ? (
    <main className="settings">
      <H1>Settings</H1>
      <div className="settings-container">
        <SettingGroup longTitle={'Journal Settings'} shortTitle={'Journal'}>
          <p>Make journal entries the way you want to make them. These settings are specific to your device, so you can have different preferences on your phone, tablet, laptop or whatever else you use!</p>
          <Setting setting="freeform" title="Enable Freeform" />
          {
            false && getSetting ('freeform') &&
            <Setting setting="audio-recording" title="Enable Audio Recording" />
          }
          <Setting setting="default-questions" title="Show Default Questions" />
          <Setting setting="custom-questions" title="Show Custom Questions" />
          <Setting setting="use-metrix" title="Show Custom Metrix" />
        </SettingGroup>
        <SettingGroup shortTitle="Prompts" longTitle="Manage Prompts">
          <CustomQuestion />
        </SettingGroup>
        <SettingGroup shortTitle="Sharing" longTitle="Manage Journal Sharing">
          <p>
            View journals shared with you and manage who you shared your journal with.
            You can always disable someone from seeing your journal once you share it with them.
          </p>
          <SharedWithMe/>
          <SharedByMe/>
          <ShareJournal/>
        </SettingGroup>
        <SettingGroup shortTitle="Misc" longTitle="Miscellaneous">
          <div className="action">
            { 
              window.navigator.canShare &&
              <span onClick={() => {
                window.navigator.share ({
                  title: 'My Journal',
                  url: 'https://lincoln-howard-jr.github.io/journal/'
                })
              }}>Share This Application</span>
            }
          </div>
          <div className="action">
            <span onClick={logout}>Log Out</span>
          </div>
          {
            attributionId === 'attributions' &&
            <div className="action">
              <span onClick={() => setAttributionId ('')}>Show Attributions</span>
            </div>
          }
          <div className="attributions" id={attributionId}>
            <div className="fake-button">
              <span onClick={() => setAttributionId ('attributions')}>Hide Attributions</span>
            </div>
            <ul>
              {Object.keys (attributions).map (k => (
                <li key={`attribiution-${k}`}>
                  <b>{k}</b>
                  <br />
                  <span dangerouslySetInnerHTML={{__html: attributions [k]}}/>
                </li>
              ))}
            </ul>
          </div>
        </SettingGroup>
      </div>
    </main>
  ) : null;
}

export default Settings
