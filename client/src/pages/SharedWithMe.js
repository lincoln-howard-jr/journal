import { useEffect, useState } from "react";
import Journal from "./Journal";

function SharedWithMe ({shareId, name, display, getShareById}) {
  const [journal, setJournal] = useState ([]);
  useEffect (() => {
    if (!shareId) return;
    (async () => {
      try {
        setJournal (await getShareById (shareId));
      } catch (e) {
        alert (e);
      }
    }) ();
  }, [shareId]);
  return (
    <>
      <main style={{display}}>
        <h2>Shared By {name}</h2>
        <Journal isNotMain display={display} entries={journal} />
      </main>
    </>
  )
}

export default SharedWithMe 