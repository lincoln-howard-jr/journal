import { useState } from "react";
import { useApp } from "../AppProvider";
import { H1, H2 } from "./components/Headers";

export default function Skills () {
  const {auth: {user}, router: {page}, skills: {skills}} = useApp ();
  const [open, setOpen] = useState (null);
  if (!user) return null;
  if (page !== 'skills') return null;
  return (
    <>
      <H1>Skills</H1>
      {
        skills.map (category => (
          <section onClick={() => open === category.meta.category ? setOpen (null) : setOpen (category.meta.category)} className={`skill-category-container${open === category.meta.category ? ' open' : ''}`} key={`cat-${category.meta.category}`}>
            <header>
              <H2>{category.meta.category}</H2>
            </header>
            {
              category.list.map (skill => (
                <div>
                  {skill.skill}
                </div>
              ))
            }
          </section>
        ))
      }
    </>
  )
}