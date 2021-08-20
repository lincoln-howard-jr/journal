import {useState} from 'react';
import {notifications as api} from '../lib/auth';

const getMinutes = _time => {
  let [time, ampm] = _time.split (' ');
  let [hours, minutes] = time.split (':');
  return (parseInt (hours) % 12) * 60 + parseInt (minutes) + (ampm === 'pm' ? 12 * 60 : 0);
}

const compareTimes = (a, b) => {
  let mina = getMinutes (a.notificationTime);
  let minb = getMinutes (b.notificationTime);
  return mina - minb;
}

export default function useNotifications (freeze) {

  const [notifications, setNotifications] = useState ([]);
  const getNotifications = async () => new Promise (async (resolve, reject) => {
    try {
      let req = await api.get ();
      let data = await req.json ();
      data.sort (compareTimes);
      setNotifications (data);
      resolve ();
    } catch (e) {
      reject (e);
    }
  })
  const createNotification = body => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      await api.post (body);
      await getNotifications ();
      resolve ();
    } catch (e) {
      reject (e);
    } finally {
      unfreeze ();
    }
  })
  const deleteNotification = id => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      await api.del (id);
      await getNotifications ();
      resolve ();
    } catch (e) {
      reject (e);
    } finally {
      unfreeze ();
    }
  });
  return {notifications, getNotifications, createNotification, deleteNotification}

}