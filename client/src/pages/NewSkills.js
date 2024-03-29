import { useEffect, useRef, useState } from "react";
import { useApp } from "../AppProvider";
import { trash } from "../img/images";
import { scrollToTop } from "../lib/scrolling";
import { H1, H2, H3 } from "./components/Headers";

export default function Skills () {
  const {auth: {user}, router: {page}, skills: {skills, submitSkill, removeSkill}, viewMode: {isViewOnly, scope}} = useApp ();
  const [open, setOpen] = useState (null);
  const [submitError, setError] = useState (null);
  const categoryRef = useRef ();
  const skillRef = useRef ();
  const onSubmit = async e => {
    if (e.preventDefault) e.preventDefault ();
    try {
      const category = categoryRef.current.value;
      const skill = skillRef.current.innerText;
      await submitSkill ({category, skill});
      categoryRef.current.value = 'Tools For ...';
      skillRef.current.innerText = '...';
    } catch (e) {
      setError ('Error while submitting skill, try again in a few...');
    }
    
  }
  useEffect (() => {
    if (page === 'skills') scrollToTop ();
  }, [page]);
  if (!user) return null;
  if (isViewOnly && scope.indexOf ('skills') === -1) return null;
  if (page !== 'skills') return null;
  return (
    <main>
      <H1>Skills</H1>
      <p style={{maxWidth: '60ch', margin: '15px auto'}}>
        Treat this as a reference sheet for your coping skills for a given situation.
        You are unique and so are the things that work for you - so add whatever you works for you!
      </p>
      <datalist id="skills-categories">
        {
          skills.map (category => (
            <option>{category.meta.category}</option>
          ))
        }
      </datalist>
      {
        !!submitError &&
        <p style={{maxWidth: '60ch', margin: '15px auto'}}>
          {submitError}
        </p>
      }
      <form onSubmit={onSubmit} className="new-skill-form">
        <H3>Add a Skill</H3>
        <div>
          <label>Category:</label>
          <input list="skills-categories" ref={categoryRef} defaultValue="Tools For"/>
        </div>
        <div>
          <label>Skill:</label>
          <p style={{padding: 7.5}} ref={skillRef} contentEditable>...</p>
        </div>
        <button onClick={onSubmit}>Add Skill</button>
      </form>
      {
        skills.map (category => (
          <section className={`skill-category-container${open === category.meta.category ? ' open' : ''}`} key={`cat-${category.meta.category}`}>
            <header style={{cursor: 'pointer'}} onClick={() => open === category.meta.category ? setOpen (null) : setOpen (category.meta.category)}>
              <H2>{category.meta.category}</H2>
            </header>
            {
              category.list.map (skill => (
                <div className="single-skill">
                  <span>{skill.skill}</span>
                  {
                    open === category.meta.category && !isViewOnly &&
                    <span onClick={() => removeSkill (skill.id)}><img src={trash} /></span>
                  }
                </div>
              ))
            }
          </section>
        ))
      }

    </main>
  )
}