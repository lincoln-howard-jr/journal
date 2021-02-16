import { useEffect, useState } from "react";
import Journal from "./Journal";

function SharedWithMe ({shareId, name, display, getShareById}) {
  const [journal, setJournal] = useState ([]);
  const [error, setErr] = useState (false);
  useEffect (() => {
    if (!shareId) return;
    (async () => {
      try {
        setJournal (await getShareById (shareId));
      } catch (e) {
        setErr ('We encountered an experience loading this journal. It may not longer be shared with you...');
      }
    }) ();
  }, [shareId]);
  return (
    <>
      <main style={{display}}>
        <h5>Shared By {name}</h5>
        <Journal isNotMain display={display} entries={journal} />
        {
          error &&
          <p className="error">{error}</p>
        }
      </main>
    </>
  )
}

export default SharedWithMe 