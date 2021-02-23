const floor = date => {
  return new Date (date.getFullYear (), date.getMonth (), date.getDate ())
}
const ceil = date => {
  return new Date (date.getFullYear (), date.getMonth (), date.getDate () + 1)
}
const isInRange = (is, after, before) => {
  return is <= before && is >= after;
}
const toMinutes = ({hours, minutes}) => {
  return hours * 60 + minutes;
}

// single-day | inclusive after | inclusive before
const constructDateFilter = value => entry => {
  if (value.mode === 'single-day') {
    return isInRange (entry.start, floor (value.date), ceil (value.date));
  } else if (value.mode === 'after') {
    return new Date (entry.start) > value.date;
  } else if (value.mode === 'before') {
    return new Date (entry.end) < value.date;
  }
}

const constructTimeFilter = value => entry => {
  if (value.mode === 'is-at') {
    return isInRange (toMinutes (value), toMinutes ({hours: entry.start.getHours (), minutes: entry.start.getHours ()}), toMinutes ({hours: entry.end.getHours (), minutes: entry.end.getHours ()}));
  } else if (value.mode === 'before') {
    return toMinutes ({hours: entry.start.getHours (), minutes: entry.start.getMinutes ()}) <= toMinutes (value);
  } else if (value.mode === 'after') {
    return toMinutes ({hours: entry.start.getHours (), minutes: entry.start.getMinutes ()}) >= toMinutes (value);
  }
}

const filterTypes = {
  'date': constructDateFilter,
  'time': constructTimeFilter
}

const constructFilterList = filters => {
  let _f = filters.map (filter => filterTypes [filter.type] (filter.value))
  console.log (_f);
  return _f;
}

export default constructFilterList