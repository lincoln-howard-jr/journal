import { useEffect, useRef, useState } from "react";
import { useApp } from "../AppProvider";
import { dateShortHand, getTime, generateDailyDateRange, generateWeeklyDateRange, generateMonthlyDateRange, isInDay } from "../lib/indexing";
import {H1} from './components/Headers';
import { cancel, caretdown, checkmark, pensmall } from "../img/images";

export default function MetrixHistory () {
  const {auth: {user}, router: {page}, metrix: {metrix, measurements, getMeasurements, singleMetrix, setSingleMetrix, updateMeasurement, measureHistoric}} = useApp ();

  const [singleMetrixMeasurements, setMez] = useState ([]);
  const [instances, setInstances] = useState ([]);
  const [selected, setSelected] = useState ([]);
  const [allSelected, setAllSelected] = useState (false);
  const [isSelecting, setIsSelecting] = useState (false);
  const isSelected = ({id}) => {
    return selected.filter (mez => mez === id).length > 0;
  }
  const status = ({id}) => {
    let s = isSelected ({id}) ? ' selected' : ' ';
    let e = editId === id ? ' editing' : '';
    return `${s}${e}`
  }
  // const toggleSelected = ({id}) => () => {
  //   if (selected.filter (mez => mez === id).length) return setSelected (selected.filter (mez => mez !== id));
  //   setSelected ([...selected, id]);
  // }
  // const selectAllOnClick = () => allSelected ? setSelected ([]) : setSelected (singleMetrixMeasurements.map (mez => mez.id));

  useEffect (() => {
    if (singleMetrixMeasurements.length) setAllSelected (selected.length === singleMetrixMeasurements.length);
  }, [selected]);

  const [editId, setEditMode] = useState (null);
  const [editValue, setEditValue] = useState (null);
  const [editError, setEditError] = useState (null);
  const editingRef = useRef ();
  const startEditing = mez => () => {
    setEditValue (mez.measurement);
    setEditMode (mez.id);
  }
  const updateValue = () => {
    let measurement = editingRef.current.innerText;
    if (singleMetrix.unit === 'number') {
      measurement = parseFloat (measurement);
      if (measurement < singleMetrix.range [0] || measurement > singleMetrix.range [1] || (measurement - singleMetrix.range [0]) % singleMetrix.step > 0) setEditError (`Number must be between ${singleMetrix.range [0]} and ${singleMetrix.range [1]} in increments of ${singleMetrix.step}`);
    }
    if (singleMetrix.unit === 'boolean') {
      if (measurement !== 'Yes' && measurement !== 'No') {
        setEditError ('Must be Yes/No answer');
      }
    }
    setEditValue (measurement);
  }
  const submitEdit = measuredAt => async () => {
    if (editError) return;
    if (editId?.startsWith ('__')) await measureHistoric (singleMetrix, editValue, measuredAt);
    if (!(editId?.startsWith ('__'))) await updateMeasurement (editId, editValue);
    await getMeasurements ();
    setEditError (null);
    setEditValue (null);
    setEditMode (null);
  }
  const cancelEdit = () => {
    let mez = instances.filter (mez => mez.id === editId) [0];
    if (editingRef.current) editingRef.current.innerText = mez.measurement;
    setEditValue (null);
    setEditMode (null);
  }

  useEffect (() => {
    if (singleMetrix && singleMetrix.id) {
      const arr = measurements.filter (mez => mez.metric === singleMetrix.id).sort ((a, b) => b.measuredAt - a.measuredAt);
      if (arr.length === 0) {
        setMez (arr);
        setInstances ([])
        return;
      }
      if (singleMetrix.frequency === 'as needed') {
        setMez (arr);
        setInstances (arr.map (mez => ({
          mez,
          id: mez.id,
          date: dateShortHand (mez.measuredAt),
          time: getTime (mez.measuredAt),
          measurement: mez.measurement || mez.value
        })));
      }
      if (singleMetrix.frequency === 'daily') {
        let range = generateDailyDateRange (arr [arr.length - 1].measuredAt);
        let mezs = range.map (day => arr.find (mez => isInDay (day, mez.measuredAt)));
        setMez (arr);
        setInstances (mezs.map ((mez, i) =>
          !mez ? {
            mez: {
              id: `__${singleMetrix.id}-${i}`,
              measurement: '...'
            },
            id: `__${singleMetrix.id}-${i}`,
            date: dateShortHand (range [i]),
            time: '...',
            measurement: '...',
            dateObj: range [i]
          } : {
            mez,
            id: mez.id,
            date: dateShortHand (mez.measuredAt),
            time: mez.isHistoric ? 'N/A' : getTime (mez.measuredAt),
            measurement: mez.measurement || mez.value
          }
        ))
      }
    }
  }, [singleMetrix, measurements]);

  if (!user || page !== 'metrix') return null;
  if (!singleMetrix) return (
    <main className="single-metrix">
      <header>
        <H1>Metrix</H1>
      </header>
      <div className="single-metrix-info">
        <p><span>Select Metrix to Review</span></p>
        <p>
          <select onChange={e => setSingleMetrix (metrix.find (m => m.id === e.target.value))}>
            <option value={singleMetrix?.id}></option>
            {
              metrix.filter (m => m !== singleMetrix).map (m => (
                <option key={`metrix-history-select-${m.id}`} value={m.id}>{m.prompt}</option>
              ))
            }
          </select>
        </p>
      </div>
      <p className="text-center"><b>Once you select a metric to review, it's history will show up here!</b></p>
    </main>
  )

  return (
    <main className="single-metrix">
      <header>
        <H1 short="Metrix">Metrix History</H1>
      </header>
      <div className="single-metrix-info">
        <p>
          <span>{singleMetrix.prompt}{singleMetrix.unitLabel ? ` ${singleMetrix.unitLabel}` : ''}</span>
          {/* <span><img style={{cursor: 'pointer'}} src={pensmall} /></span> */}
        </p>
        <p>
          <span>Recorded {singleMetrix.frequency}</span>
        </p>
        {
          isSelecting &&
          <p>
            <span>
              <select onChange={e => {setSingleMetrix (metrix.find (m => m.id === e.target.value)); setIsSelecting (false)}}>
                <option value={singleMetrix?.id}>-- select metrix --</option>
                {
                  metrix.filter (m => m !== singleMetrix).map (m => (
                    <option key={`metrix-history-select-${m.id}`} value={m.id}>{m.prompt}</option>
                  ))
                }
              </select>
            </span>
            <span onClick={() => setIsSelecting (false)}>
              <img style={{cursor: 'pointer'}} src={cancel} />
            </span>
          </p>
        }
        {
          !isSelecting &&
          <p>
            <span>Review Another Metrix</span>
            <span onClick={() => setIsSelecting (true)}><img style={{cursor: 'pointer'}} src={caretdown} /></span>
          </p>
        }
      </div>
      {
        instances.length === 0 &&
        <p className="text-center">No measurements yet!</p>
      }
      {
        instances.length > 0 &&
        <ul className="metrix-history">
          <li className="metrix-history-header">
            <span>Date</span>
            <span>Time</span>
            <span>Measurement</span>
          </li>
          {
            instances.map (({mez, id, date, time, measurement, dateObj}) => (
              <li className={`metrix-measurement ${status (mez)}`} key={`single-metrix-measurement-${id}`}>
                <span>{date}</span>
                <span>{time}</span>
                <div>
                  <p onBlur={updateValue} {...{ref: editId === id ? editingRef : null}} contentEditable={id === editId}>{editId === id ? editValue : measurement}</p> 
                  {
                    editId === mez.id &&
                    <span onClick={submitEdit (dateObj)}>
                      <img src={checkmark} />
                    </span>
                  }
                </div>
                <span onClick={editId === mez.id ? cancelEdit : startEditing (mez)} className="metrix-more">
                  {
                    editId !== mez.id &&
                    <img src={pensmall} />
                  }
                  {
                    editId === mez.id &&
                    <img src={cancel} />
                  }
                </span>
              </li>
            ))
          }
        </ul>
      }
    </main>
  )
}