import { useState } from 'react'

const getTime = (d=new Date ()) => {  
  return `${(d.getHours () % 12 || 12)}:${`0${d.getMinutes ()}`.slice(-2)} ${d.getHours () > 11 ? 'pm' : 'am'}`;
}

const EntryHeader = ({date, isOpen, open, close}) => {
  return isOpen ? (
    <header className="entry-header">
      <span onClick={close}>x</span>
      <h2>{date}</h2>
    </header>
  ) : (
    <header className="entry-header">
      <span onClick={open}>more</span>
      <h2>{date}</h2>
    </header>
  )
}

const EntryContents = ({entries, open}) => entries.map (entry => {
  return open ? (
    <section key={`entry-${entry.id}`}>
      <h3>{getTime (entry.start)}</h3>
      {
        entry.entryType !== 'freeform' &&
        entry.questions.map ((q, i) => (
          <section>
            <p>
              <b>{q} </b>
              {entry.answers [i]}
            </p>
          </section>
        ))
      }
      {
        entry.entryType === 'freeform' &&
        <section>
          <p>{entry.freeform}</p>
        </section>
      }
    </section>
  ) : (<div></div>)
})


function Journal({display, entries}) {
  const [open, setOpen] = useState ([]);

  return (
    <main style={{display}}>
      {entries.map (index => (
        <article key={`index-${index.date}`}>
          <EntryHeader date={index.meta.date} isOpen={open.indexOf (index.date) !== -1} open={() => {setOpen (open => [...open, index.date])}} close={() => {
            setOpen (open => open.filter (d => d !== index.date))
          }} index={index} />
          <EntryContents open={open.indexOf (index.date) !== -1} entries={index.list} />
        </article>
      ))}
    </main>
  );
}

export default Journal
