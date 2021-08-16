import {skill, book, dashboard, settings, ruler, leftarrow} from '../../img/images';
import { useApp } from "../../AppProvider"

export default function Nav () {
  const {auth: {user}, router: {page, redirect}, viewMode: {isViewOnly}, viewMyJournal} = useApp ();
  return (
    <>
      <nav className={isViewOnly ? 'view-only' : ''}>
        <ul>
          {
            isViewOnly &&
            <>
              <li className={page === 'write' ? 'active' : ''} onClick={viewMyJournal}>
                <img alt="" width="32" height="32" src={leftarrow} />
                <label>Go Back</label>
              </li>
            </>
          }
          <li className={page === 'skills' ? 'active' : ''} onClick={() => {redirect (`/?page=skills`)}}>
            <img alt="" width="32" height="32" src={skill} />
            <label>Skills</label>
          </li>
          <li className={page === 'journal' ? 'active' : ''} onClick={() => {redirect (`/?page=journal`)}}>
            <img alt="" width="32" height="32" src={book} />
            <label>Journal</label>
          </li>
          <li className={page === 'metrix' ? 'active' : ''} onClick={() => {redirect (`/?page=metrix`)}}>
            <img alt="" width="32" height="32" src={ruler} />
            <label>Metrix</label>
          </li>
          <li className={page === 'dashboard' ? 'active' : ''} onClick={() => {redirect (`/?page=dashboard`)}}>
            <img alt="" width="32" height="32" src={dashboard} />
            <label>Dash</label>
          </li>
        </ul>
      </nav>
      {
        page !== 'settings' && user &&
        <div onClick={() => redirect ('/?page=settings')} id="settings-menu-icon">
          <img src={settings} alt="" />
        </div>
      }
    </>
  )
}