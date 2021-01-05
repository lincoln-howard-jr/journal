import React, { useRef, useEffect, useState } from 'react'
import {skills as api, active} from '../auth'
import Pen from '../img/pen.svg'

const findIndex = (indexedArr, key, value, meta={}) => {
  let found = indexedArr.filter (el => el [key] === value)
  if (found.length > 0) return found [0].list;
  let index = {[key]: value, meta, list: []};
  indexedArr.push (index);
  return index.list;
}

function Skills ({display}) {
  const [skills, setSkills] = useState ([]);
  const [mode, setMode] = useState ('reference');
  const catRef = useRef ();
  const sklRef = useRef ();
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
  useEffect (() => {
    getSkills ();
  }, [active]);
  const openEditor = () => {
    setMode ('edit');
  }
  const submitSkill = async () => {
    console.log (catRef, sklRef);
    let body = {
      category: catRef.current.value,
      skill: sklRef.current.innerText
    }
    await api.post (body);
    setMode ('reference');
  }
  return (
    <>
      <main style={{display: mode === 'edit' ? display : 'none'}}>
        <h2>New Skill</h2>
        <div>Category: <input ref={catRef} defaultValue="Tools For ..."/></div>
        <div>Skill: <p style={{padding: 7.5}} ref={sklRef} contentEditable>...</p></div>
        <div>
          <button onClick={submitSkill}>Add Skill</button>
          <button onClick={()=>{setMode ('reference')}}>Cancel</button>
        </div>
      </main>
      <main style={{display: mode === 'reference' ? display : 'none'}}>
        <span onClick={openEditor} style={{height: 64, display: 'grid', alignItems: 'center',justifyContent: 'center'}}><img src={Pen} width={24} height={24}/></span>
        {
          skills.map (category => (
            <section>
              <h2>{category.meta.category}</h2>
              <ul>
                {
                  category.list.map (skill => (
                    <li>{skill.skill}</li>
                  ))
                }
              </ul>
            </section>
          ))
        }
      </main>
    </>
  )
}

export default Skills
