import { useEffect, useState } from "react"

export default function ({key, children, defferedClassName, delay}) {
  const [deferring, setDeferring] = useState (true);
  useEffect (() => {
    setTimeout (() => {
      setDeferring (false);
    }, delay);
  }, []);
  return deferring ? <article className={defferedClassName} /> : (
    <>
      {children}
    </>
  );
}