import { useEffect } from "react";
import { useApp } from "../AppProvider";

function SharedWithMe () {
  const {router: {params}, sharing: {sharedWithMe}, viewSharedJournal} = useApp ();
  useEffect (() => {
    console.log (params, sharedWithMe);
    if (!sharedWithMe || !sharedWithMe.length || !params.get ('share')) return;
    let shareId = params.get ('share');
    let share = sharedWithMe.find (s => s.id === shareId);
    if (share) viewSharedJournal (share.userId, share);
  }, [params, sharedWithMe]);

  return null
}

export default SharedWithMe 