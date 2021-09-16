import { useEffect, useState } from "react";
import { useApp } from "../AppProvider";
import { dateShortHand, getTime, generateDailyDateRange, generateWeeklyDateRange, generateMonthlyDateRange, isInDay, isInWeek, isInMonth, printDate, oneDay } from "../lib/indexing";
import {H1} from './components/Headers';
import { cancel, caretdown, pensmall } from "../img/images";
import {MetrixType} from './components/Metrix';

const dateFloor = (date=new Date (), type='week') => {
  if (type === 'week') return new Date (date.getFullYear (), date.getMonth (), date.getDate () - date.getDay ());
  if (type === 'month') return new Date (date.getFullYear (), date.getMonth (), 0);
  return new Date (date.getFullYear (), date.getMonth (), date.getDate ());
}

export default function MetrixHistory () {
  const {auth: {user}, router: {page}, metrix: {metrix, measurements, singleMeasurement, getMeasurements, singleMetrix, setSingleMetrix, setSingleMeasurement, updateMeasurement, measureHistoric}, freeze} = useApp ();

  const [instances, setInstances] = useState ([]);
  const [isSelecting, setIsSelecting] = useState (false);
  
  const [editId, setEditMode] = useState (singleMeasurement ? singleMeasurement.id : null);
  const [editValue, setEditValue] = useState (singleMeasurement ? singleMeasurement.measurement : null);
  const [editError, setEditError] = useState (null);
  const startEditing = mez => {
    setEditValue (mez.measurement);
    setEditMode (mez.id);
    setEditError (null);
  }
  const updateValue = newValue => {
    setEditValue (newValue);
  }
  const submitEdit = measuredAt => async () => {
    if (editError) return;
    if (editId?.startsWith ('__')) await measureHistoric (singleMetrix, editValue, measuredAt);
    if (!(editId?.startsWith ('__'))) await updateMeasurement (editId, editValue);
    let unfreeze = freeze ();
    setTimeout (() => {
      try {
        getMeasurements ()
      } finally {
        unfreeze ()
      }
    }, 500);
    setEditError (null);
    setEditValue (null);
    setEditMode (null);
  }
  const cancelEdit = () => {
    setEditValue (null);
    setEditMode (null);
    setEditError (null);
  }

  useEffect (() => {
    if (singleMeasurement) startEditing (singleMeasurement);
  }, [singleMeasurement]);

  useEffect (() => {
    if (singleMetrix && singleMetrix.id) {
      const arr = measurements.filter (mez => mez.metric === singleMetrix.id).sort ((a, b) => b.measuredAt - a.measuredAt);
      if (arr.length === 0) {
        setInstances ([])
        return;
      }
      if (singleMetrix.frequency === 'as needed') {
        setInstances (arr.map (mez => ({
          mez,
          id: mez.id,
          date: `${dateShortHand (mez.measuredAt)} - ${getTime (mez.measuredAt)}`,
          measurement: mez.measurement || mez.value
        })));
      }
      if (singleMetrix.frequency === 'daily') {
        let range = generateDailyDateRange (arr [arr.length - 1].measuredAt);
        let mezs = range.map (day => arr.find (mez => isInDay (day, mez.measuredAt)));
        setInstances (mezs.map ((mez, i) =>
          !mez ? {
            mez: {
              id: `__${singleMetrix.id}-${i}`,
              measurement: ''
            },
            id: `__${singleMetrix.id}-${i}`,
            date: dateShortHand (range [i]),
            time: '...',
            measurement: '',
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
      if (singleMetrix.frequency === 'weekly') {
        let range = generateWeeklyDateRange (arr [arr.length - 1].measuredAt);
        let mezs = range.map (day => arr.find (mez => isInWeek (day, mez.measuredAt)));
        setInstances (mezs.map ((mez, i) =>
          !mez ? {
            mez: {
              id: `__${singleMetrix.id}-${i}`,
              measurement: ''
            },
            id: `__${singleMetrix.id}-${i}`,
            date: `${dateShortHand (range [i + 1])} - ${dateShortHand (new Date (range [i] - oneDay))}`,
            time: '...',
            measurement: '',
            dateObj: range [i]
          } : {
            mez,
            id: mez.id,
            date: `${dateShortHand (range [i + 1])} - ${dateShortHand (new Date (range [i] - oneDay))}`,
            time: mez.isHistoric ? 'N/A' : getTime (mez.measuredAt),
            measurement: mez.measurement || mez.value
          }
        ))
      }
      if (singleMetrix.frequency === 'monthly') {
        let range = generateMonthlyDateRange (arr [arr.length - 1].measuredAt);
        let mezs = range.map (day => arr.find (mez => isInMonth (day, mez.measuredAt)));
        setInstances (mezs.map ((mez, i) =>
          !mez ? {
            mez: {
              id: `__${singleMetrix.id}-${i}`,
              measurement: ''
            },
            id: `__${singleMetrix.id}-${i}`,
            date: dateShortHand (range [i]),
            time: '...',
            measurement: '',
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
            <span />
            <span>Date</span>
            <span>Measurement</span>
          </li>
          {
            instances.map (({mez, id, date, measurement, dateObj}) => (
              <li className={`metrix-measurement ${editId === id ? 'editing' : ''}`} key={`single-metrix-measurement-${id}`}>
                <span />
                <span>{date}</span>
                <div>
                  <p>{measurement}</p> 
                </div>
                <span onClick={() => setSingleMeasurement (mez)} className="metrix-more">
                  {
                    editId !== mez.id &&
                    <img src={pensmall} />
                  }
                </span>
                {
                  editId === mez.id && singleMetrix.unit === 'boolean' &&
                  <MetrixType.boolean onChange={updateValue} defaultValue={editValue}  />
                }
                {
                  editId === mez.id && singleMetrix.unit === 'number' &&
                  <MetrixType.number onChange={updateValue} defaultValue={editValue} {...singleMetrix} />
                }
                {
                  editId === mez.id &&
                  <div className="toolbar">
                    <button onClick={submitEdit (dateObj)}>Update Value</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                }
                
              </li>
            ))
          }
        </ul>
      }
    </main>
  )
}