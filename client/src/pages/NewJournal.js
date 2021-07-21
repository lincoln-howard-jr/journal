import { useState } from "react";
import { useApp } from "../AppProvider";
import { dateShortHand, getTime } from "../lib/indexing";
import { H1, H2, H3 } from "./components/Headers";
import Query from "./components/Query";
import AnalogClock from "./components/viz/AnalogClock";

function JournalCard ({idx}) {
  const [open, setOpen] = useState ('');
  return (
    <article className={open}>
      <header onClick={() => {setOpen (open === '' ? 'open' : '')}}>
        <H2 short={dateShortHand (idx.list [0].start)}>{idx.meta.date}</H2>
        <ol>
          {
            idx.list.map (entry => (
              <li>
                <AnalogClock date={entry.start} />
              </li>
            ))
          }
        </ol>
      </header>
      {
        idx.list.map (entry => (
          <section>
            <H3 short={getTime (entry.start)}>
              {getTime (entry.start)} - {getTime (entry.end)}
            </H3>
            {
              (entry.entryType === 'questions' || !entry.entryType) &&
              entry.questions.map ((q, i) => (
                <p key={`${entry.id}-question-${i}`}>
                  <b>{q} </b>
                  {entry.answers [i]}
                </p>
              ))
            }
            {
              entry.entryType === 'freeform' &&
              <p>{entry.freeform}</p>
            }
            {
              entry.entryType === 'audio' &&
                <figure>
                  <figcaption><p>{entry.audio.title}</p></figcaption>
                  <audio controls src={entry.audio.url} />
                </figure>
            }
          </section>
        ))
      }
    </article>
  )
}

export default function Journal () {
  const {auth: {user}, router: {page}, journal: {entries, clearSearch, hideEntry}, freeze} = useApp ();

  if (!user || page !== 'journal') return null;
  return (
    <main className="view-journal">
      <H1>Journal</H1>
      <Query />
      {
        entries.map (idx => (
          <JournalCard idx={idx} />
        ))
      }
    </main>
  )

}