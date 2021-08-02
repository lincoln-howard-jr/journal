export default function TimePicker ({value, onChange}) {
  const extractMinutes = () => value.split (' ') [0].split (':') [1];
  const extractHours = () => value.split (' ') [0].split (':') [0];
  const extractAmpm = () => value.split (' ') [1];
  const updateMinutes = e => {
    let value = parseInt (e.target.value);
    if (value < 0 || value > 59) return;
    onChange (`${extractHours ()}:${('00' + e.target.value).slice (-2)} ${extractAmpm ()}`)
  }
  const updateHours = e => {
    let value = parseInt (e.target.value);
    if (value < 1 || value > 12) return;
    onChange (`${e.target.value}:${extractMinutes ()} ${extractAmpm ()}`)
  }
  const updateAmpm = () => onChange (`${extractHours ()}:${extractMinutes ()} ${extractAmpm () === 'pm' ? 'am' : 'pm'}`)
  return (
    <>
      <input type="number" onChange={updateHours} value={extractHours ()} />
      :
      <input type="number" onChange={updateMinutes} value={extractMinutes ()} />
      <span className="fake-button" onClick={updateAmpm}>{extractAmpm ()}</span>
    </>
  )
}