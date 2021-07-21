import { useEffect } from "react";
import { useApp } from "../AppProvider";
import Journal from "./Journal";
import {H2} from './components/Headers';

function SharedWithMe () {
  const {auth: {user}, router: {page, params}, sharing: {getShareById, sharedJournal}} = useApp ();
  useEffect (() => {
    if (!user || !params.get ('shareId')) return;
    (async () => {
      try {
        await getShareById (params.get ('shareId'));
      } catch (e) {
        alert ('We encountered an experience loading this journal. It may not longer be shared with you...');
      }
    }) ();
  }, [params, page, user]);
  if (page !== 'sharing' || !user) return null;
  return (
    <>
      <main>
        <H2>Shared By {params.get ('name')}</H2>
        <Journal isNotMain _entries={sharedJournal} />
      </main>
    </>
  )
}

export default SharedWithMe 