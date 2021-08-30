import Write from './pages/Write'
import NewWrite from './pages/NewWrite'
import Journal from './pages/NewJournal'
import Settings from './pages/Settings'
import Skills from './pages/NewSkills'
import Nav from './pages/components/Nav'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import './App.css'
import MetrixHistory from './pages/MetrixHistory'
import SharedWithMe from './pages/SharedWithMe'

function App() {
  return (
    <>
      <Auth />
      <Skills />
      <NewWrite />
      <Journal />
      <Settings />
      <Dashboard />
      <MetrixHistory />
      <Nav />
      <SharedWithMe />
    </>
  );
}

export default App;