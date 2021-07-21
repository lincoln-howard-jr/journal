import { H1, H2 } from './components/Headers';
import MinusSVG from '../img/minus.svg'
import TrashSVG from '../img/trash.svg'
import CancelSVG from '../img/cancel.svg'
import { useApp } from '../AppProvider';
import { useRef } from 'react';

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

function Skills () {
  const {auth: {user}, router: {page}, settings: {getSetting, toggle, iter}, skills: {skills, isStaged, submitSkill, stageForRemoval, unstage, removeSkill}, freeze} = useApp ();

  const sklRef = useRef ();
  const catRef = useRef ();
  const addSkill = async e => {
    let unfreeze = freeze ();
    try {
      let category = catRef.current.value;
      let skill = sklRef.current.innerText;
      await submitSkill ({category, skill});
      catRef.current.value = 'Tools For';
      sklRef.current.innerText = '...';
      unfreeze ();
    } catch (e) {
      unfreeze ();
    }
  }
  if (!user) return null;
  if (page !== 'skills') return null;
  if (!getSetting ('skill-add-mode')) return (
    <main className="skill-category">
      <H1 short="Skills">Reference Your Skills</H1>
      <div className="text-center">
        <a className="fake-button text-center" onClick={toggle ('skill-add-mode')}>Add A Skill</a>
      </div>
      {
        skills.map (category => (
          <section key={`skill-category-${category.meta.category}`} className="skill-category">
            <H2>{category.meta.category}</H2>
            <ul>
              {
                category.list.map (skill => (
                  <li key={`skill-skill-${skill.id}`} className={isStaged (skill.id) ? 'to-remove' : 'stable'}>
                    <span>{skill.skill}</span>
                    <span>
                      {
                        isStaged (skill.id) ? 
                        <>
                          <img onClick={e => removeSkill (skill.id)} src={TrashSVG} />
                          <img onClick={e => unstage (skill.id)} src={CancelSVG} />
                        </>
                        :
                          <img onClick={e => stageForRemoval (skill.id)} src={MinusSVG} />
                        }
                      </span>
                  </li>
                ))
              }
            </ul>
          </section>
        ))
      }
    </main>
  )
  return (
    <main>
      <datalist id="skills-categories">
        {
          skills.map (category => (
            <option>{category.meta.category}</option>
          ))
        }
      </datalist>
      <H1>Add A Skill</H1>
      <div>Category: <input list="skills-categories" ref={catRef} defaultValue="Tools For"/></div>
      <div>Skill: <p style={{padding: 7.5}} ref={sklRef} contentEditable>...</p></div>
      <div>
        <button onClick={addSkill}>Add Skill</button>
        <button onClick={toggle ('skill-add-mode')}>Cancel</button>
      </div>
      <hr style={{margin: '10vh 0'}} />
      <SkillSuggestions />
    </main>
  )
}
export default Skills