import {useEffect, useState} from 'react';
import {metrix as metrixApi, measurements as measurementsApi} from '../lib/auth';

let thisMorning = new Date ();
thisMorning = new Date (thisMorning.getFullYear (), thisMorning.getMonth (), thisMorning.getDate ());
let tonight =  new Date (thisMorning.getFullYear (), thisMorning.getMonth (), thisMorning.getDate () + 1);
const isToday = date => date > thisMorning && date < tonight;

export default function useMetrix () {
  
  // relevant state
  const [metrix, setMetrix] = useState ([]);
  const [measurements, setMeasurements] = useState ([])
  const [newMeasurements, setNew] = useState ([]);
  const [captured, setCaptured] = useState ([]);

  // get metrix
  const getMetrix = async userId => {
    try {
      const req = await metrixApi.get (userId);
      let data = await req.json ();
      setMetrix (data);
    } catch (e) {
      console.log ('#getMetrix', e);
    }
    return Promise.resolve ();
  }

  // create a metrix
  const createMetrix = async body => new Promise (async (resolve, reject) => {
    try {
      const req = await metrixApi.post (body);
      if (!req.ok) throw new Error ('request not ok');
      await getMetrix ();
      resolve ();
    } catch (e) {
      console.log ('#createMetrix', e);
      reject (e);
    }
  })

  // get metrix
  const getMeasurements = async userId => {
    try {
      const req = await measurementsApi.get (userId);
      let data = await req.json ();
      data = data.map (m => Object.assign (m, {measuredAt: new Date (m.measuredAt)}));
      setMeasurements (data);
    } catch (e) {
      console.log ('#getMeasurements', e);
    }
    return Promise.resolve ();
  }

  const measure = (metric, value) => {
    if (!metrix.find (m => metric.id === m.id)) return;
    let nm = newMeasurements.slice ();
    let found = nm.findIndex (mez => mez.metricId === metric.id);
    if (found === -1) return setNew ([...newMeasurements, {metricId: metric.id, body: {value, unit: metric.unit}}]);
    if (value === undefined) nm.splice (found, 1);
    else nm [found].body.value = value;
    setNew (nm);
  }

  const getMeasureValue = (prompt) => newMeasurements.find (mez => mez.metricId === prompt?.id)?.body?.value;

  // create a metrix
  const createMeasurements = async () => new Promise (async (resolve, reject) => {
    try {
      await Promise.all (newMeasurements.map (mez => measurementsApi.post (mez.metricId, mez.body)));
      setNew ([]);
      await getMeasurements ();
      resolve ();
    } catch (e) {
      console.log ('#createMeasurements', e);
      reject (e);
    }
  })

  const isCaptured = (metricId) => captured.includes (metricId);

  useEffect (() => {
    if (!metrix.length || !measurements.length) return;
    let today = measurements.filter (mes => metrix.find (met => met.id === mes.metric).frequency !== 'as needed').filter (m => isToday (m.measuredAt));
    let cap = metrix.filter (metric => !!today.find (m => m.metric === metric.id)).map (metric => metric.id);
    setCaptured (cap);
  }, [metrix, measurements]);

  return {metrix, measurements, captured, getMetrix, createMetrix, getMeasureValue, getMeasurements, measure, createMeasurements, isCaptured}

}