import { useApp } from "../AppProvider"
import Metrics from './components/viz/Metrics'
import {H1} from './components/Headers'


function Analytics () {
  const {router: {page}} = useApp ();

  if (page !== 'dashboard') return null;
  return (
    <main className="dashboard">
      <H1>Dashboard</H1>
      <Metrics />
    </main>
  )
}

export default Analytics