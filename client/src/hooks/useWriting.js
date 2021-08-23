import { useState } from "react";
import {questions as api} from '../lib/auth';

export default function useWriting (freeze) {

  const [questions, setQuestions] = useState ([]);
  
  const getQuestions = async () => new Promise (async (resolve, reject) => {
    try {
      let req = await api.get ();
      let qs = await req.json ();
      setQuestions (qs.map (q => ({prompt: q.body, id: `custom-question-${q.id}`, unit: 'string', frequency: 'as needed'})));
      resolve (qs);
    } catch (e) {
      reject (e);
    }
  });

  const createQuestion = async q => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      await api.post (q);
      await getQuestions ();
      resolve ();
    } catch (e) {
      reject (e);
    } finally {
      unfreeze ();
    }
  });

  const deleteQuestion = async q => new Promise (async (resolve, reject) => {
    let unfreeze = freeze ();
    try {
      let req = await api.del (q);
      if (!req.ok) throw new Error ('Could not delete question');
      await getQuestions ();
      resolve ();
    } catch (e) {
      reject (e);
    } finally {
      unfreeze ();
    }
  })

  return {questions, getQuestions, createQuestion, deleteQuestion};
 
}