import {useEffect, useState} from 'react';
import {useApp} from '../../AppProvider';
import DateFilter from './DateFilter';
import TimeFilter from './TimeFilter';
import CalendarSVG from '../../img/calendar.svg';
import StopwatchSVG from '../../img/stopwatch.svg';
import SearchIcon from '../../img/search.svg';
import FilterSVG from '../../img/filter.svg';
import {plus} from '../../img/images';

const filterTypes = {
  'date': DateFilter,
  'time': TimeFilter
}

export default function Query () {
  
  // state mgmt
  const {journal: {query, filters, filterIterator, setQuery, setFilters}, router: {redirect}} = useApp ();
  const [open, setOpen] = useState (false);
  const [dateFilters, setDateFilters] = useState ([]);
  const [timeFilters, setTimeFilters] = useState ([]);
  const [typeFilter, setTypeFilter] = useState ([]);
  
  // on filter update, sort out filter lists
  useEffect (() => {
    setDateFilters (filters.filter (filter => filter.type === 'date'));
    setTimeFilters (filters.filter (filter => filter.type === 'time'));
    setTypeFilter (filters.filter (filter => filter.type === 'type'))
  }, [filterIterator]);

  // add date filter and reassign mode if necessary
  const addDateFilter = () => {
    if (dateFilters.length === 0) {
      let newFilters = [...filters, {type: 'date', value: {mode: 'single-day', date: new Date ()}}]
      setFilters (newFilters);
    } else if (dateFilters.length === 1) {
      let curr = filters.filter (fil => fil.type === 'date') [0];
      curr.value = Object.assign (curr.value, {mode: 'after', modeFinal: true});
      let newFilters = [...filters, {type: 'date', value: {mode: 'before', modeFinal: true, date: new Date ()}}];
      setFilters (newFilters)
    } else {
      return;
    }
  }
  const addTimeFilter = () => {
    if (timeFilters.length === 0) {
      let newFilters = [...filters, {
        type: 'time',
        value: {
          mode: 'is-at',
          time: `${new Date ().getHours () % 12 || 12}:${('00' + new Date ().getMinutes ()).slice (-2)} ${new Date ().getHours < 12 ? 'am' : 'pm'}`
        }
      }]
      setFilters (newFilters);
    } else if (timeFilters.length === 1) {
      timeFilters [0].value.mode = 'after';
      let newFilters = [...filters, {
        type: 'time',
        value: {
          mode: 'before',
          time: timeFilters [0].value.time
        }
      }]
      setFilters (newFilters);
    } else {
      return;
    }
  }
  const remove = index => () => {
    filters.splice (index, 1);
    setFilters (filters);
  }
  const setFilterValue = index => value => {
    filters [index].value = value;
    setFilters (filters);
  }
  return (
    <>
      <div className="grid search-container">
        <span onClick={() => redirect ('/?page=write')}><img src={plus} /></span>
        <form className="search-bar" onSubmit={e => e.preventDefault ()}>
          <input value={query} onChange={e => setQuery (e.target.value)} placeholder="Search..." />
          <img src={SearchIcon} />
        </form>
        <span onClick={e => setOpen (!open)} className="open-filters">
          <img src={FilterSVG} />
        </span>
      </div>
      {
        open ? (
          <>
            <ol className="grid filter-list">
              {
                filters.map ((filter, index) => {
                  let Filter = filterTypes [filter.type];
                  return (
                    <Filter value={filter.value} remove={remove (index)} setValue={setFilterValue (index)} />
                  );
                })
              }
            </ol>
            {
              (filters.length === 0) &&
              <div className="grid">
                You don't have any filters, add some by clicking on the icons below!
              </div>
            }
            <ul className="grid add-filter-list">
              <li onClick={addDateFilter} className={dateFilters.length < 2 ? '' : "add-filter-disabled"}>
                <img src={CalendarSVG} alt="date filter" />
              </li>
              <li onClick={addTimeFilter} className={timeFilters.length < 2 ? '' : "add-filter-disabled"}>
                <img src={StopwatchSVG} alt="time filter" />
              </li>
            </ul>
            <hr />
          </>
        ) : (
          <div className="none" />
        )
      }
    </>
  )
}