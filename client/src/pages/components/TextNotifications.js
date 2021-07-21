import { useApp } from "../../AppProvider"
import { useRef, useState } from 'react';
import PencilSVG from '../../img/pen.svg';
const _defaultMessage = "Hey :) just a reminder to write in your journal!";
export default function Notifications ({defaultMessage=_defaultMessage}) {
  const {notifications, freeze} = useApp ();
  const [editId, setEditId] = useState (null);
  const [ampm, setAmpm] = useState ('pm');
  const [time, setTime] = useState ('12:00');
  const [message, setMessage] = useState (defaultMessage);
  const messageRef = useRef ();

  const reset = () => {
    setEditId (null);
    setAmpm ('am');
    setTime ('12:00')
    setMessage (defaultMessage);
    setStep (0);
  }
  
  const selectNotificationToEdit = note => () => {
    const [time, mode] = note.notificationTime.split (' ');
    setEditId (note.id);
    setAmpm (mode);
    setTime (time);
    setMessage (note.message);
    setStep (0);
  }

  const createNotification = async () => {
    let unfreeze = freeze ();
    try {
      if (!ampm || !time) throw new Error ('Cannot create notification without exact time.');
      await notifications.createNotification ({notificationTime: `${time} ${ampm}`, message: messageRef.current ? messageRef.current.innerText : message});
      reset ();
      unfreeze ();
    } catch (e) {
      unfreeze ();
      console.log (e);
    }
  }
  const deleteNotification = id => async () => {
    let unfreeze = freeze ();
    try {
      await notifications.deleteNotification (id);
      reset ();
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }
  const [step, setStep] = useState (0);
  const steps = [
    (
      <>
        {
          !!editId &&
          <p>
            <b>
              {message}
            </b>
          </p>
        }
        {
          !!editId &&
          <>
            <button onClick={reset}>Exit</button>
            <button onClick={() => setStep (step + 1)}>Edit</button>
            <button onClick={deleteNotification (editId)}>Delete Notification</button>
          </>
        }
        {
          !editId &&
          <>
            <button onClick={() => setStep (step + 1)}>Create Notification</button>
          </>
        }
      </>
    ),
    (
      <>
        <b>Select A Time:</b>
        <br/>
        <select defaultValue={time} onChange={e => setTime (e.target.value)}>
          <option>12:00</option>
          <option>12:15</option>
          <option>12:30</option>
          <option>12:45</option>
          <option>1:00</option>
          <option>1:15</option>
          <option>1:30</option>
          <option>1:45</option>
          <option>2:00</option>
          <option>2:15</option>
          <option>2:30</option>
          <option>2:45</option>
          <option>3:00</option>
          <option>3:15</option>
          <option>3:30</option>
          <option>3:45</option>
          <option>4:00</option>
          <option>4:15</option>
          <option>4:30</option>
          <option>4:45</option>
          <option>5:00</option>
          <option>5:15</option>
          <option>5:30</option>
          <option>5:45</option>
          <option>6:00</option>
          <option>6:15</option>
          <option>6:30</option>
          <option>6:45</option>
          <option>7:00</option>
          <option>7:15</option>
          <option>7:30</option>
          <option>7:45</option>
          <option>8:00</option>
          <option>8:15</option>
          <option>8:30</option>
          <option>8:45</option>
          <option>9:00</option>
          <option>9:15</option>
          <option>9:30</option>
          <option>9:45</option>
          <option>10:00</option>
          <option>10:15</option>
          <option>10:30</option>
          <option>10:45</option>
          <option>11:00</option>
          <option>11:15</option>
          <option>11:30</option>
          <option>11:45</option>
        </select>
        <select defaultValue={ampm} onChange={e => setAmpm (e.target.value)}>
          <option>am</option>
          <option>pm</option>
        </select>
        <br/>
        <button onClick={() => setStep (step - 1)}>Back</button>
        <button onClick={() => setStep (step + 1)}>Customize Message</button>
      </>
    ),
    (
      <>
        <b>Customize Message:</b>
        <p ref={messageRef} contentEditable>{message}</p>
        <button onClick={() => {setMessage (messageRef.current.innerText); setStep (step - 1)}}>Back</button>
        {
          !editId &&
          <>
            <button onClick={() => setStep (step - 1)}>Back</button>
            <button onClick={createNotification}>Finish</button>
          </>
        }
        {
          !!editId &&
          <button>Update Notification</button>
        }
      </>
    )
  ]
  return (
    <>
      {
        notifications.notifications.length > 0 &&
        <p>All you have to do is specifiy times you want to recieve reminders to enter in your journal and we will automatically send a text to you at that time each day! Click one of the times to remove that notification.</p>
      }
      <div className="notification-list">
        {
          notifications.notifications.map (note => (
            <span className="button-styling" onClick={selectNotificationToEdit (note)}><span>{note.notificationTime}</span> <img src={PencilSVG} /></span>
          ))
        }
      </div>
      {
        notifications.notifications.length === 0 &&
        <p>You haven't created any notifications yet, and that's totally ok! Just remember we're always here if you need us!</p>
      }
      <div className="notification-creator">
        {steps [step]}
      </div>
    </>
  )
}