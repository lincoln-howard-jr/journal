import { useEffect, useState } from "react";
import { useApp } from "../../../AppProvider";
import NumberCounter from "./Counter";

const thisWeek = () => {
  let end = new Date ();
  let start = new Date (end.getFullYear (), end.getMonth (), end.getDate () - 7);
  return date => date < end && date > start;
}

export function EntriesThisWeek () {
  const {journal: {entryList, entries}} = useApp ();
  const inThisWeek = thisWeek ();
  const [count, setCount] = useState ('...');
  useEffect (() => {
    if (!entryList.length) return;
    setCount ('' + entryList.filter (entry => inThisWeek (entry.start)).length);
  }, [entries])

  return (
    <figure>
      <figcaption>Entries<br/>(Past Week)</figcaption>
      <NumberCounter number={count} />
    </figure>
  )
}

export function QuestionsThisWeek () {
  const {journal: {entryList, entries}} = useApp ();
  const inThisWeek = thisWeek ();
  const [count, setCount] = useState ('...');
  useEffect (() => {
    if (!entryList.length) return;
    let list = entryList.filter (entry => inThisWeek (entry.start));
    let c = list.reduce ((acc, val) => {
      let add =  val.entryType === 'questions' ? val.questions.length : 0;
      return acc + add;
    }, 0);
    setCount (c);
  }, [entries])

  return (
    <figure>
      <figcaption>Questions Answered<br/>(Past Week)</figcaption>
      <NumberCounter number={count} />
    </figure>
  )
}

export function TotalEntryCount () {
  const {journal: {entryList, entries}} = useApp ();
  const [count, setCount] = useState ('...');
  useEffect (() => {
    if (!entryList.length) return;
    setCount (entryList.length);
  }, [entries])

  return (
    <figure>
      <figcaption>Entries<br/>(All Time)</figcaption>
      <NumberCounter number={count} />
    </figure>
  )
}

export function SkillCount () {
  const {skills: {skills}} = useApp ();
  const [count, setCount] = useState ('...');
  useEffect (() => {
    if (!skills || !skills.length) return;
    setCount (skills.reduce ((acc, val) => {
      return acc + val.list.length;
    }, 0));
  }, [skills]);

  return (
    <figure>
      <figcaption>Your Skills<br/>(All Time)</figcaption>
      <NumberCounter number={count} />
    </figure>
  )
}