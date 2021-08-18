import React, { useRef, useState } from "react";
import sanitizePhoneNumber from '../lib/sanitizePhoneNumber'
import {H1, H2, H3} from "./components/Headers";
import attributions from '../lib/attributions'
import {useApp} from '../AppProvider';
import Notifications from "./components/TextNotifications";
import CaretSVG from '../img/caret-down.svg';
import CustomQuestion from "./components/CustomQuestions";

function ShareJournal () {
  const {sharing: {shareJournal}, settings} = useApp ();
  const numRef = useRef ();
  const nameRef = useRef ();
  const swnRef = useRef ();
  const onClick = async () => {
    let phone = numRef.current.value;
    phone = sanitizePhoneNumber (phone);
    let name = nameRef.current.value;
    let shareWithName = swnRef.current.value;
    let share = await shareJournal (phone, name, shareWithName);
    settings.addSetting (`share-${share.id}`, true);
    numRef.current.value = '';
    swnRef.current.value = '';
  }
  return (
    <div className="action">
      <b style={{textDecoration: 'none'}}>Share Your Journal With</b>
      <br/>
      <input ref={swnRef} placeholder="James Allen" />
      <br/>
      <input type="tel" ref={numRef} placeholder="123-456-7890" />
      <br/>
      <b style={{textDecoration: 'none'}}>Your Name</b>
      <br/>
      <input ref={nameRef} />
      <br />
      <span onClick={onClick}>Submit</span>
    </div>
  )
}

function SharedByMe () {
  const {freeze, sharing: {sharedByMe, toggleFreeze}} = useApp ();

  const onToggle = (share) => async () => {
    let unfreeze = freeze ('');
    try {
      await toggleFreeze (share.id);
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }
  return (
    <div>
      <b style={{textDecoration: 'none'}}>Who You Share Your Journal With</b>
      <hr style={{width: '25vw'}}/>
      {
        sharedByMe.length === 0 &&
        <span style={{textDecoration: 'none'}}>You haven't shared your journal - no pressure</span>
      }
      {
        sharedByMe.map (share => (
          <React.Fragment key={`share-${share.id}`}>
            <Setting onToggle={onToggle (share)} title={share.shareWithName || share.shareWith} setting={`share-${share.id}`} />
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
            <span onClick={() => viewSharedJournal (share.userId)}>{share.name}</span>
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
      {children}
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
  const {router: {page, redirect}, settings: {getSetting, iter}, auth: {user, logout}} = useApp ();
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
            getSetting ('freeform') &&
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
            View journals shared with you and who you've shared your journal with.
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
