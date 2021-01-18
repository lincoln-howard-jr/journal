import useAuth from '../hooks/useAuth'
import useSettings from '../hooks/useSettings';

const attributions = {
  'calendar.svg': '<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>',
  'pen.svg': 'Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'book.svg': 'Icons made by <a href="https://www.flaticon.com/authors/zlatko-najdenovski" title="Zlatko Najdenovski">Zlatko Najdenovski</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'plus.svg': 'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'list.svg': 'Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'skill.svg': 'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',
  'settings.svg': 'Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'
}

function Setting ({setting, title, toggle, getSetting}) {
  return (
    <div className="setting">
      <div>{title}</div>
      <div><span onClick={toggle (setting)} className={getSetting (setting) ? 'toggle on' : 'toggle'} /></div>
    </div>
  )
}

function Settings({settings, swStatus, install, display, logout}) {
  return (
    <main className="settings" style={{display}}>
      <Setting setting="freeform" title="Enable Freeform" {...settings} />
      {!swStatus && 
        <div className="action">
          <span onClick={install}>Install!</span>
        </div>
      }
      <div className="action">
        <span onClick={logout}>Log Out</span>
      </div>
      <div id="attributions">
        <h2>Attributions</h2>
        <ul>
          {Object.keys (attributions).map (k => (
            <li key={`attribiution-${k}`} dangerouslySetInnerHTML={{__html: attributions [k]}}></li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Settings
