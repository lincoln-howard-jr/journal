import React, { useEffect, useRef, useState } from 'react'
import Pen from '../img/pen.svg'

function Skills ({display, skills, submitSkill}) {
  const [mode, setMode] = useState ('reference');
  const catRef = useRef ();
  const sklRef = useRef ();
  const openEditor = () => {
    setMode ('edit');
  }
  const onSubmitSkill = async () => {
    try {
      await submitSkill ({category: catRef.current.value, skill: sklRef.current.innerText})
    } catch (e) {

    }
    setMode ('reference');
  }
  return (
    <>
      <datalist id="skills-categories">
        {
          skills.map (category => (
            <option>{category.meta.category}</option>
          ))
        }
      </datalist>
      <main style={{display: mode === 'edit' ? display : 'none'}}>
        <h2>New Skill</h2>
        <div>Category: <input list="skills-categories" ref={catRef} defaultValue="Tools For"/></div>
        <div>Skill: <p style={{padding: 7.5}} ref={sklRef} contentEditable>...</p></div>
        <div>
          <button onClick={onSubmitSkill}>Add Skill</button>
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
