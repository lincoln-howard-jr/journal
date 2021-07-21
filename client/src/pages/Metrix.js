import { useApp } from "../AppProvider";
import { getTime, printDate } from "../lib/indexing";
import CaretSVG from '../img/caret-down.svg'
import {H1, H3} from './components/Headers';
import { useState } from "react";

export default function Metrix () {
  const {router: {page}, metrix: {metrix, measurements}} = useApp ();
  const [open, setOpen] = useState ([]);
  const toggleOpen = id => () => {
    let found = open.filter (mid => mid === id);
    if (!found.length) return setOpen ([...open, id]);
    setOpen (open.filter (mid => mid !== id));
  }

  if (page !== 'metrix') return null;
  return (
    <main>
      <H1>Metrix</H1>
      <ul className="metrix-measurements">
        {
          metrix.map (metric => (
            <li className={open.indexOf (metric.id) !== -1 ? 'open' : ''}>
              <span></span>
              <span><H3>{metric.prompt}</H3></span>
              <span onClick={toggleOpen (metric.id)}><img src={CaretSVG} /></span>
              <ul>
                {
                  measurements.filter (measure => measure.metric === metric.id).map (measure => (
                    <li>
                      <span>{printDate (measure.measuredAt)} at {getTime (measure.measuredAt)}</span>
                      <span>{measure.value}</span>
                    </li>
                  ))
                }
              </ul>
            </li>
          ))
        }
      </ul>
    </main>
  )
}