import {useState} from 'react';
import {skills as api} from '../lib/auth';

const findIndex = (indexedArr, key, value, meta={}) => {
  let found = indexedArr.filter (el => el [key] === value)
  if (found.length > 0) return found [0].list;
  let index = {[key]: value, meta, list: []};
  indexedArr.push (index);
  return index.list;
}

export default function useSkills () {

  const [skills, setSkills] = useState ([]);
  const [staged, setStaged] = useState ([]);
  const getSkills = async userId => {
    try {
      let req = await api.get (userId);
      let data = await req.json ();
      let indexed = data.reduce ((acc, val) => {
        findIndex (acc, 'category', val.category, {category: val.category}).push (val);
        return acc;
      }, []);
      setSkills (indexed);
    } catch (e) {
    }
  }
  const submitSkill = (body) => new Promise (async (resolve, reject) => {
    try {
      await api.post (body);
      await getSkills ();
      resolve ();
    } catch (e) {
      reject (e);
    }
  })
  const stageForRemoval = id => {
    setStaged ([...staged, id]);
  }
  const unstage = id => {
    setStaged (staged.filter (_id => _id !== id));
  }
  const isStaged = id => {
    return staged.includes (id);
  }
  const removeSkill = id => new Promise (async (resolve, reject) => {
    try {
      if (!isStaged (id)) return;
      await api.del (id);
      await getSkills ();
      resolve ();
    } catch (e) {
      reject (e);
    }
  });
  return {skills, getSkills, submitSkill, stageForRemoval, unstage, isStaged, removeSkill}

}