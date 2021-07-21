import React, { useRef, useState } from 'react'
import { H2 } from './components/Headers';
import MinusSVG from '../img/minus.svg'
import TrashSVG from '../img/trash.svg'
import CancelSVG from '../img/cancel.svg'

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

function Skills ({display, freeze, skills, submitSkill, removeSkill}) {
  const [mode, setMode] = useState ('reference');
  const [removing, setRemoving] = useState ([]);
  const startRemovingSkill = id => {
    if (removing.includes (id)) return remove (id);
    setRemoving (removing => [...removing, id]);
  }
  const cancelRemoveSkill = id => {
    setRemoving (removing => removing.filter (el => el !== id));
  }
  const shouldRemove = id => removing.includes (id);
  const remove = async id => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      if (!removing.includes (id)) return reject (new Error (`have not staged skill[${id}] for removal, cannot remove`));
      await removeSkill (id);
      setRemoving (removing => removing.filter (el => el !== id));
      unfreeze ();
      resolve ();
    } catch (e) {
      unfreeze ();
      reject (e);
    }
  })
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
        <H2>New Skill</H2>
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
            <section className="skill-category">
              <H2>{category.meta.category}</H2>
              <ul>
                {
                  category.list.map (skill => (
                    <li className={shouldRemove (skill.id) ? 'to-remove' : 'stable'}>
                      <span>{skill.skill}</span>
                      <span>{shouldRemove (skill.id) ? 
                        <>
                          <img onClick={e => startRemovingSkill (skill.id)} src={TrashSVG} />
                          <img onClick={e => cancelRemoveSkill (skill.id)} src={CancelSVG} />
                        </>
                        :
                        <img onClick={e => startRemovingSkill (skill.id)} src={MinusSVG} />}</span>
                    </li>
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