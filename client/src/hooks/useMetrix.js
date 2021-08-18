import {useEffect, useState} from 'react';
import {metrix as metrixApi, measurements as measurementsApi} from '../lib/auth';
import { defaultMetrix } from '../lib/defaultQuestions';

let thisMorning = new Date ();
thisMorning = new Date (thisMorning.getFullYear (), thisMorning.getMonth (), thisMorning.getDate ());
let tonight =  new Date (thisMorning.getFullYear (), thisMorning.getMonth (), thisMorning.getDate () + 1);
const isToday = date => date > thisMorning && date < tonight;

let thisWeek = new Date ();
thisWeek = new Date (thisWeek.getFullYear (), thisWeek.getMonth (), thisWeek.getDate () - thisWeek.getDay ());
const isThisWeek = date => date > thisWeek;

let thisMonth = new Date ();
thisMonth = new Date (thisWeek.getFullYear (), thisWeek.getMonth (), 0);
const isThisMonth = date => date > thisMonth;

export default function useMetrix () {
  
  // relevant state
  const [metrix, setMetrix] = useState (defaultMetrix);
  const [measurements, setMeasurements] = useState ([])
  const [newMeasurements, setNew] = useState ([]);
  const [captured, setCaptured] = useState ([]);
  const [singleMetrix, setSingleMetrix] = useState (null);
  const [singleMeasurement, setSingleMeasurement] = useState (null);

  // get metrix
  const getMetrix = async userId => {
    try {
      const req = await metrixApi.get (userId);
      let data = await req.json ();
      setMetrix ([...defaultMetrix, ...data]);
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

  const deleteMetrix = async id => new Promise (async (resolve, reject) => {
    try {
      await metrixApi.del (id);
      await getMetrix ();
      resolve ();
    } catch (e) {
      reject (e);
    }
  })

  // get metrix
  const getMeasurements = async userId => {
    try {
      const req = await measurementsApi.get (userId);
      let data = await req.json ();
      data = data.map (m => Object.assign (m, {measurement: (m.measurement || m.value), measuredAt: new Date (m.measuredAt)}));
      setMeasurements (data);
    } catch (e) {
      console.log ('#getMeasurements', e);
    }
    return Promise.resolve ();
  }

  const measure = (metric, measurement) => {
    let possible = [...metrix, ...defaultMetrix];
    if (!possible.find (m => metric.id === m.id)) return;
    let nm = newMeasurements.slice ();
    let found = nm.findIndex (mez => mez.metricId === metric.id);
    if (found === -1) return setNew ([...newMeasurements, {metricId: metric.id, body: {measurement, unit: metric.unit}}]);
    if (measurement === undefined) nm.splice (found, 1);
    else nm [found].body.measurement = measurement;
    setNew (nm);
  }

  const measureHistoric = async (metric, measurement, measuredAt) => {
    await measurementsApi.post (metric.id, {measurement, unit: metric.unit, measuredAt});
  }

  const getMeasureValue = (prompt) => newMeasurements.find (mez => mez.metricId === prompt?.id)?.body?.measurement;

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

  const updateMeasurement = async (mez, value) => {
    await measurementsApi.put (mez, value);
  }

  const isCaptured = (metricId) => captured.includes (metricId);

  useEffect (() => {
    if (!metrix.length || !measurements.length) return;
    let today = measurements.filter (mes => metrix.find (met => met.id === mes.metric)?.frequency === 'daily').filter (m => isToday (m.measuredAt));
    let thisWeek = measurements.filter (mes => metrix.find (met => met.id === mes.metric)?.frequency === 'weekly').filter (m => isThisWeek (m.measuredAt));
    let thisMonth = measurements.filter (mes => metrix.find (met => met.id === mes.metric)?.frequency === 'monthly').filter (m => isThisMonth (m.measuredAt));
    let cap = [
      ...metrix.filter (metric => !!today.find (m => m.metric === metric.id)).map (metric => metric.id),
      ...metrix.filter (metric => !!thisWeek.find (m => m.metric === metric.id)).map (metric => metric.id),
      ...metrix.filter (metric => !!thisMonth.find (m => m.metric === metric.id)).map (metric => metric.id)
    ]
    setCaptured (cap);
  }, [metrix, measurements]);

  return {metrix, singleMetrix, singleMeasurement, measurements, captured, getMetrix, setSingleMetrix, setSingleMeasurement, createMetrix, updateMeasurement, deleteMetrix, getMeasureValue, getMeasurements, measure, createMeasurements, measureHistoric, isCaptured}

}