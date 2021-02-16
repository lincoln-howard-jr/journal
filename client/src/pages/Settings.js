import { useEffect, useRef } from "react";
import sanitizePhoneNumber from '../lib/sanitizePhoneNumber'
import {H2, H3} from "./components/Headers";

const attributions = {
  'calendar.svg': '<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>',
  'pen.svg': 'Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'book.svg': 'Icons made by <a href="https://www.flaticon.com/authors/zlatko-najdenovski" title="Zlatko Najdenovski">Zlatko Najdenovski</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'plus.svg': 'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'list.svg': 'Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'skill.svg': 'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'settings.svg': 'Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'search.svg': '<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>'
}

function ShareJourunal ({shareJournal, settings}) {
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
      <p style={{textDecoration: 'none'}}>Share Your Journal With</p>
      <input ref={swnRef} placeholder="James Allen" />
      <input type="tel" ref={numRef} placeholder="123-456-7890" />
      <p style={{textDecoration: 'none'}}>Your Name</p>
      <input ref={nameRef} />
      <br />
      <span onClick={onClick}>Submit</span>
    </div>
  )
}

function SharedByMe ({freeze, sharedByMe, toggleSetting, getSetting, toggleFreeze}) {
  const onToggle = (share) => () => async () => {
    let unfreeze = freeze ();
    try {
      await toggleFreeze (share.id);
      toggleSetting (`share-${share.id}`) ();
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }
  return (
    <div>
      <p style={{textDecoration: 'none'}}>Who You Share Your Journal With</p>
      <hr style={{width: '25vw'}}/>
      {
        sharedByMe.length === 0 &&
        <span style={{textDecoration: 'none'}}>You haven't shared your journal - no pressure</span>
      }
      {
        sharedByMe.map (share => (
          <Setting getSetting={getSetting} title={share.shareWithName || share.shareWith} setting={`share-${share.id}`} onToggle={onToggle (share)} />
        ))
      }
    </div>
  );
}

function SharedWithMe ({sharedWithMe, redirect}) {
  let shares = sharedWithMe.filter (share => !share.frozen);
  return (
    <div className="action">
      <p style={{textDecoration: 'none'}}>Journals Shared With You</p>
      <hr style={{width: '25vw'}}/>
      {
        shares.length === 0 &&
        <span style={{textDecoration: 'none'}}>Nobody has shared a journal with you...</span>
      }
      {
        shares.map (share => (
          <span onClick={() => {redirect (`?page=sharing&id=${share.id}&name=${share.name}`)}}>{share.name}</span>
        ))
      }
    </div>
  )
}

function SettingGroup ({longTitle, shortTitle, children}) {
  return (
    <div className="setting-group">
      <header>
        <H3 short={shortTitle}>{longTitle}</H3>
      </header>
      {children}
      <div></div>
    </div>
  )
}

function Setting ({setting, title, onToggle, getSetting, relationships=[]}) {
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
      <div>{title}</div>
      <div><span onClick={onToggle.apply (null, [setting, ...relationships])} className={getSetting (setting) ? 'toggle on' : 'toggle'} /></div>
    </div>
  )
}

function Settings({freeze, settings, swStatus, install, uninstall, display, logout, shareJournal, sharedWithMe, sharedByMe, toggleFreeze, redirect}) {
  return (
    <main className="settings" style={{display}}>
      <SettingGroup longTitle={'Journal Settings'} shortTitle={'Journal'}>
        <Setting setting="freeform" title="Enable Freeform" getSetting={settings.getSetting} onToggle={settings.toggle} />
        <Setting setting="audio-recording" title="Enable Audio Recording" getSetting={settings.getSetting} onToggle={settings.toggle} relationships={['+freeform']} />
        <Setting setting="default-questions" title="Show Default Questions" getSetting={settings.getSetting} onToggle={settings.toggle} relationships={['|custom-questions']} />
        <Setting setting="custom-questions" title="Show Custom Questions" getSetting={settings.getSetting} onToggle={settings.toggle} relationships={['|default-questions']} />
      </SettingGroup>
      <ShareJourunal settings={settings} shareJournal={shareJournal} />
      <SharedWithMe settings={settings} sharedWithMe={sharedWithMe} redirect={redirect} />
      <SharedByMe freeze={freeze} getSetting={settings.getSetting} toggleSetting={settings.toggle} setSetting={settings.set} sharedByMe={sharedByMe} toggleFreeze={toggleFreeze} />
      {
        !swStatus && 
        <div className="action">
          <span onClick={install}>Install!</span>
        </div>
      }
      {
        !!swStatus &&
        <div className="action">
          <span onClick={uninstall}>Uninstall</span>
        </div>
      }
      <div className="action">
        <span onClick={logout}>Log Out</span>
      </div>
      <section id="attributions">
        <H2>Attributions</H2>
        <ul>
          {Object.keys (attributions).map (k => (
            <li key={`attribiution-${k}`} dangerouslySetInnerHTML={{__html: attributions [k]}}></li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Settings
