import { useRef } from "react";

const attributions = {
  'calendar.svg': '<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>',
  'pen.svg': 'Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'book.svg': 'Icons made by <a href="https://www.flaticon.com/authors/zlatko-najdenovski" title="Zlatko Najdenovski">Zlatko Najdenovski</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'plus.svg': 'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'list.svg': 'Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'skill.svg': 'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'settings.svg': 'Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'
}

function ShareJourunal ({shareJournal}) {
  const numRef = useRef ();
  const nameRef = useRef ();
  const onClick = () => {
    let phone = numRef.current.value;
    let name = nameRef.current.value;
    shareJournal (phone, name);
    numRef.current.value = '';
  }
  return (
    <div className="action">
      <p style={{textDecoration: 'none'}}>Share Your Journal With</p>
      <input type="tel" ref={numRef} />
      <p style={{textDecoration: 'none'}}>Your Name</p>
      <input ref={nameRef} />
      <br />
      <span onClick={onClick}>Submit</span>
    </div>
  )
}

function SharedWithMe ({sharing, redirect}) {
  return (
    <div className="action">
      <p style={{textDecoration: 'none'}}>Journals Shared With You</p>
      <p style={{textDecoration: 'none'}}>Click To View</p>
      <hr style={{width: '45vw'}}/>
      {
        sharing.map (share => (
          <span onClick={() => {redirect (`https://lincoln-howard-jr.github.io/journal/?page=sharing&id=${share.id}&name=${share.name}`)}}>{share.name}</span>
        ))
      }
    </div>
  )
}

function Setting ({setting, title, toggle, getSetting}) {
  return (
    <div className="setting">
      <div>{title}</div>
      <div><span onClick={toggle (setting)} className={getSetting (setting) ? 'toggle on' : 'toggle'} /></div>
    </div>
  )
}

function Settings({settings, swStatus, install, display, logout, shareJournal, sharing, redirect}) {
  return (
    <main className="settings" style={{display}}>
      <Setting setting="freeform" title="Enable Freeform" {...settings} />
      {!swStatus && 
        <div className="action">
          <span onClick={install}>Install!</span>
        </div>
      }
      <ShareJourunal shareJournal={shareJournal} />
      <SharedWithMe sharing={sharing} redirect={redirect} />
      <div className="action">
        <span onClick={logout}>Log Out</span>
      </div>
      <section id="attributions">
        <h2>Attributions</h2>
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
