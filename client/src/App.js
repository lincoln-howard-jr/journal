import Write from './pages/Write'
import NewWrite from './pages/NewWrite'
import Journal from './pages/NewJournal'
import Settings from './pages/Settings'
import Skills from './pages/Skills';
import Nav from './pages/components/Nav'
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Metrix from './pages/Metrix';
import './App.css';

function App() {
  return (
    <>
      <Auth />
      <Skills />
      <Write />
      <NewWrite />
      <Journal />
      <Settings />
      <Dashboard />
      <Metrix />
      <Nav />
    </>
  );
}

export default App;