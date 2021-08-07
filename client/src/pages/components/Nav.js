import NavSkills from '../../img/skill.svg'
import NavPlus from '../../img/plus.svg'
import NavBook from '../../img/book.svg'
import NavSettings from '../../img/settings.svg'
import NavDash from '../../img/dashboard.svg'
import BackSVG from '../../img/left-arrow.svg'
import RulerSVG from '../../img/ruler.svg';
import { useApp } from "../../AppProvider"

export default function Nav () {
  const {auth: {user}, router: {page, redirect}, viewMode: {isViewOnly}, viewMyJournal} = useApp ();
  return (
    <>
      <nav>
        <ul>
          {
            isViewOnly &&
            <>
              <li className={page === 'write' ? 'active' : ''} onClick={viewMyJournal}>
                <img alt="" width="32" height="32" src={BackSVG} />
                <label>Go Back</label>
              </li>
            </>
          }
          <li className={page === 'skills' ? 'active' : ''} onClick={() => {redirect (`/?page=skills`)}}>
            <img alt="" width="32" height="32" src={NavSkills} />
            <label>Skills</label>
          </li>
          {
            !isViewOnly &&
            <li className={page === 'write' ? 'active' : ''} onClick={() => {redirect (`/?page=write`)}}>
              <img alt="" width="32" height="32" src={NavPlus} />
              <label>Write</label>
            </li>  
          }
          <li className={page === 'journal' ? 'active' : ''} onClick={() => {redirect (`/?page=journal`)}}>
            <img alt="" width="32" height="32" src={NavBook} />
            <label>Journal</label>
          </li>
          <li className={page === 'dashboard' ? 'active' : ''} onClick={() => {redirect (`/?page=dashboard`)}}>
            <img alt="" width="32" height="32" src={NavDash} />
            <label>Dash</label>
          </li>
        </ul>
      </nav>
      {
        page !== 'settings' && user &&
        <div onClick={() => redirect ('/?page=settings')} id="settings-menu-icon">
          <img src={NavSettings} alt="" />
        </div>
      }
    </>
  )
}