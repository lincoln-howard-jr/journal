import {useState} from 'react';
import {skills as api} from '../auth';

const findIndex = (indexedArr, key, value, meta={}) => {
  let found = indexedArr.filter (el => el [key] === value)
  if (found.length > 0) return found [0].list;
  let index = {[key]: value, meta, list: []};
  indexedArr.push (index);
  return index.list;
}

export default function useSkills () {

  const [skills, setSkills] = useState ([]);
  const getSkills = async () => {
    try {
      let req = await api.get ();
      let data = await req.json ();
      let indexed = data.reduce ((acc, val) => {
        findIndex (acc, 'category', val.category, {category: val.category}).push (val);
        return acc;
      }, []);
      setSkills (indexed);
    } catch (e) {
      alert (e);
    }
  }
  const submitSkill = (body) => new Promise (async (resolve, reject) => {
    try {
      setSkills (skls => {
        let idx = findIndex (skls, 'category', body.category, {category: body.category});
        idx.push (body);
        return skls;
      })
      await api.post (body);
      resolve ();
    } catch (e) {
      let pending = JSON.parse (localStorage.getItem ('pending-actions') || '[]');
      pending.push ({
        action: 'submit-skill',
        body
      });
      localStorage.setItem ('pending-actions', JSON.stringify (pending));
      reject (e);
    }
  })

  return {skills, getSkills, submitSkill}

}