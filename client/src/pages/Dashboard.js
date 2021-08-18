import { useApp } from "../AppProvider"
import Metrics from './components/viz/Metrics'
import {H1, H3} from './components/Headers'
import { key } from "../img/images";
import AnalogClock from './components/viz/AnalogClock'


function Analytics () {
  const {router: {page}, journal: {entryList}} = useApp ();

  if (page !== 'dashboard') return null;
  if (entryList.length < 10) return (
    <main>
      <H1>Dashboard</H1>
      <H3>Unlock <span style={{display: 'inline-block', marginInline: 'var(--body-text-size)', width: 'var(--h3-font-size)'}}><img style={{width: '100%'}} src={key} /></span> the dashboard when you make 10 journal entries!</H3>
      <H3>Only {10 - entryList.length} entries to go!</H3>
      <AnalogClock className="large" />
      <H3>It's only a matter of time!</H3>
    </main>
  )
  return (
    <main className="dashboard">
      <H1>Dashboard</H1>
      <Metrics />
    </main>
  )
}

export default Analytics