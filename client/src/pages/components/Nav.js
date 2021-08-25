import {skill, book, dashboard, settings, ruler, leftarrow} from '../../img/images';
import { useApp } from "../../AppProvider"

const dict = {
  skills: skill,
  journal: book,
  metrix: ruler,
  dashboard
}
const labels = {
  skills: 'Skills',
  journal: 'Journal',
  metrix: 'Metrix',
  dashboard: 'Dash'
}

export default function Nav () {
  const {auth: {user}, router: {page, redirect}, viewMode: {isViewOnly, scope}, viewMyJournal} = useApp ();
  if (isViewOnly) return (
    <nav className={`view-only count-${1 + scope.length}`}>
      <ul>
        <li onClick={viewMyJournal}>
          <img alt="" width="32" height="32" src={leftarrow} />
          <label>Go Back</label>
        </li>
        {
          scope.map (type => (
            <li className={page === type ? 'active' : ''} onClick={() => redirect (`/?page=${type}`)}>
              <img src={dict [type]} />
              <label>{labels [type]}</label>
            </li>
          ))
        }
      </ul>
    </nav>
  )
  return (
    <>
      <nav>
        <ul>
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