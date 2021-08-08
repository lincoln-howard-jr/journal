import { useState } from "react";
import {questions as api} from '../lib/auth';

export default function useWriting () {

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
    try {
      let req = await api.post (q);
      let nq = await req.json ();
      setQuestions (questions => [...questions, q]);
      resolve (nq);
    } catch (e) {
      reject (e);
    }
  });

  const deleteQuestion = async q => new Promise (async (resolve, reject) => {
    try {
      let req = await api.del (q);
      if (!req.ok) throw new Error ('Could not delete question');
      await getQuestions ();
      resolve ();
    } catch (e) {
      reject (e);
    }
  })

  return {questions, getQuestions, createQuestion, deleteQuestion};
 
}