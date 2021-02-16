import React, { useEffect, useRef, useState } from 'react'
import { H2 } from './components/Headers';

function SkillSuggestions () {
  return (
    <>
      <p>If you're having trouble thinking of some? We made a list of some sample skills!</p>
      <section>
        <h3 className="dont-hide" style={{textDecoration: 'underline'}}>Suggestions:</h3>
        <ul style={{margin: '2vh 0'}}>
          <li>Go for a walk</li>
          <li>Focus on a small, simple task</li>
          <li>Read a short, interesting article</li>
          <li>Practice mindfullness</li>
          <li>Listen to your own words</li>
          <li>Check the facts</li>
        </ul>
      </section>
    </>
  )
}

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
      <main className={mode === 'edit' ? display : 'none'}>
        <h2>New Skill</h2>
        <div>Category: <input list="skills-categories" ref={catRef} defaultValue="Tools For"/></div>
        <div>Skill: <p style={{padding: 7.5}} ref={sklRef} contentEditable>...</p></div>
        <div>
          <button onClick={onSubmitSkill}>Add Skill</button>
          <button onClick={()=>{setMode ('reference')}}>Cancel</button>
        </div>
        <hr style={{margin: '10vh 0'}} />
        <SkillSuggestions />
      </main>
      <main className={mode === 'reference' ? display : 'none'}>
        {
          !skills.length && (
            <>
              <p>
                You haven't added any coping skills yet, but that's ok! Click on 'Add New Skill' to start
                adding coping skills!
              </p>
              <p>Having trouble thinking of some? We made a list of some sample skills!</p>
              <SkillSuggestions />
            </>
          )
        }
        {
          skills.map (category => (
            <section>
              <H2>{category.meta.category}</H2>
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
        <span style={{marginTop: '2.5vh'}} onClick={openEditor} className="fake-button">Add New Skill</span>
        {
          !skills.length && (
            <>
              <p>
                You haven't added any coping skills yet, but that's ok! Click on 'Add New Skill' to start
                adding coping skills!
              </p>
              <p>Having trouble thinking of some? We made a list of some sample skills!</p>
              <SkillSuggestions />
            </>
          )
        }
      </main>
    </>
  )
}

export default Skills