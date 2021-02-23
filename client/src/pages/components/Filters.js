import DateFilter from './DateFilter';
import TimeFilter from './TimeFilter';
import CalendarSVG from '../../img/calendar.svg';
import StopwatchSVG from '../../img/stopwatch.svg';

const filterTypes = {
  'date': DateFilter,
  'time': TimeFilter
}


function Filters ({open, filters, setFilters}) {
  filters.sort ((a, b) => a.type < b.type);
  const dateFilters = filters.filter (filter => filter.type === 'date');
  const timeFilters = filters.filter (filter => filter.type === 'time');
  const addDateFilter = () => {
    if (dateFilters.length === 0) {
      let newFilters = [...filters, {type: 'date', value: {mode: 'single-day', date: new Date ()}}]
      setFilters (newFilters);
    } else if (dateFilters.length === 1) {
      filters.filter (fil => fil.type === 'date') [0].value.mode = 'after';
      let newFilters = [...filters, {type: 'date', value: {mode: 'before', date: new Date ()}}];
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
          minutes: new Date ().getMinutes (),
          hours: new Date ().getHours ()
        }
      }]
      setFilters (newFilters);
    } else if (timeFilters.length === 1) {
      timeFilters [0].value.mode = 'after';
      let newFilters = [...filters, {
        type: 'time',
        value: {
          mode: 'before',
          minutes: new Date ().getMinutes (),
          hours: new Date ().getHours ()
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
  return open ? (
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
        {
          dateFilters.length < 2 &&
          <li onClick={addDateFilter}>
            <img src={CalendarSVG} alt="date filter" />
          </li>
        }
        {
          timeFilters.length < 2 &&
          <li onClick={addTimeFilter}>
            <img src={StopwatchSVG} alt="time filter" />
          </li>
        }
      </ul>
      <hr />
    </>
  ) : (
    <div className="none" />
  )
}

export default Filters