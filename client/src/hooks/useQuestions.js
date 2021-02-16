import { useState } from "react";
import {questions as api} from '../auth';

export default function useQuestions () {

  const [questions, setQuestions] = useState ([]);
  
  const getQuestions = async () => new Promise (async (resolve, reject) => {
    try {
      let req = await api.get ();
      let qs = await req.json ();
      setQuestions (qs.map (q => q.body));
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

  return {questions, getQuestions, createQuestion};

}