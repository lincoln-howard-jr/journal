import {useState} from 'react';
import {shares as api} from '../lib/auth';
import {runIndexEntries} from '../lib/indexing';

export default function useSharing (settings) {

  const [sharedWithMe, setSharedWithMe] = useState ([]);
  const [sharedByMe, setSharedByMe] = useState ([]);
  const [sharedJournal, setSharedJournal] = useState ([]);
  const getShares = async () => {
    try {
      let req = await api.get ();
      let {sharedWithMe, sharedByMe} = await req.json ();
      setSharedByMe (sharedByMe);
      setSharedWithMe (sharedWithMe);
      let sett = sharedByMe.map (sbm => {return {key: `share-${sbm.id}`, value: !sbm.frozen}});
      settings.setAll (sett);
    } catch (e) {
      console.log (e);
    }
  }
  const getShareById = async id => new Promise (async (resolve, reject) => {
    try {
      let req = await api.getById (id);
      let arr = await req.json ();
      let dict = runIndexEntries (arr);
      setSharedJournal (dict);
      resolve ();
    } catch (e) {
      reject (e);
    }
  })

  const toggleFreeze = async id => new Promise (async (resolve, reject) => {
    try {
      await api.toggleFreeze (id);
      await getShares ();
      resolve ();
    } catch (e) {
      reject (e);
    }
  });

  const shareJournal = async (phone, name, shareWithName) => new Promise (async (resolve, reject) => {
    try {
      let shareWith = (phone.length === 10) ? `+1${phone}` : phone;
      await api.post ({shareWith, name, shareWithName});
      await getShares ();
      resolve ();
    } catch (e) {
      reject (e);
    }
  })

  return {sharedByMe, sharedWithMe, sharedJournal, getShareById, getShares, shareJournal, toggleFreeze};

}