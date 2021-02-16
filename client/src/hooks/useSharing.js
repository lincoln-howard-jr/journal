import {useState} from 'react';
import {shares as api} from '../auth';
import {runIndexEntries} from '../lib/indexing';

export default function useSharing () {

  const [sharedWithMe, setSharedWithMe] = useState ([]);
  const [sharedByMe, setSharedByMe] = useState ([]);
  const getShares = async cb => {
    try {
      let req = await api.get ();
      let dict = await req.json ();
      setSharedByMe (dict.sharedByMe);
      setSharedWithMe (dict.sharedWithMe);
      cb (dict);
    } catch (e) {
    }
  }
  const getShareById = async id => new Promise (async (resolve, reject) => {
    try {
      let req = await api.getById (id);
      let arr = await req.json ();
      let dict = runIndexEntries (arr);
      resolve (dict);
    } catch (e) {
      reject (e);
    }
  })

  const toggleFreeze = async id => new Promise (async (resolve, reject) => {
    try {
      let req = await api.toggleFreeze (id);
      let updated = await req.json ();
      setSharedByMe (sbm => sbm.map (share => share.id === id ? updated : share))
      resolve ();
    } catch (e) {
      reject (e);
    }
  });

  const shareJournal = async (phone, name, shareWithName) => new Promise (async (resolve, reject) => {
    try {
      let shareWith = (phone.length === 10) ? `+1${phone}` : phone;
      let req = await api.post ({shareWith, name, shareWithName});
      let share = await req.json ();
      alert (`Successfully shared your journal with ${phone}!`);
      console.log (share);
      resolve (share);
    } catch (e) {
      reject (e);
    }
  })

  return {sharedByMe, sharedWithMe, getShareById, getShares, shareJournal, toggleFreeze};

}