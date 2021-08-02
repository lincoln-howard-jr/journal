const floor = date => {
  return new Date (date.getFullYear (), date.getMonth (), date.getDate ())
}
const ceil = date => {
  return new Date (date.getFullYear (), date.getMonth (), date.getDate () + 1)
}
const isInRange = (is, after, before) => {
  return is <= before && is >= after;
}
const toMinutes = (hours, minutes) => {
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
  const [time, ampm] = value.time.split (' ');
  console.log (time.split (':'))
  const [_hours, minutes] = time.split (':').map (num => parseInt (num));
  const hours = _hours % 12 + (ampm === 'pm' ? 12 : 0);
  console.log (value, hours, minutes);
  if (value.mode === 'is-at') {
    return isInRange (toMinutes (hours, minutes), toMinutes (entry.start.getHours (), entry.start.getHours ()), toMinutes (entry.end.getHours (), entry.end.getHours ()));
  } else if (value.mode === 'before') {
    return toMinutes (entry.start.getHours (), entry.start.getMinutes ()) <= toMinutes (hours, minutes);
  } else if (value.mode === 'after') {
    return toMinutes (entry.start.getHours (), entry.start.getMinutes ()) >= toMinutes (hours, minutes);
  }
}

const constructEntryTypeFilter  = value => entry => {
  return entry.entryType === value.entryType;
}

const filterTypes = {
  type: constructEntryTypeFilter,
  date: constructDateFilter,
  time: constructTimeFilter
}

const constructFilterList = filters => {
  let _f = filters.map (filter => filterTypes [filter.type] (filter.value))
  return _f;
}

export default constructFilterList