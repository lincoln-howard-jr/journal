import { useEffect, useRef, useState } from 'react';
import SearchIcon from '../../img/search.svg';
import FilterSVG from '../../img/filter.svg';

function Search ({updateSearch, openFilter, onClear}) {
  const [query, _setQuery] = useState (undefined);
  const setQuery = e => {
    let q = e.target.value;
    _setQuery (q);
  }
  const handleSubmit = e => {
    if (e.preventDefault) e.preventDefault ();
  }
  useEffect (() => {
    onClear (() => () => {
      _setQuery ('');
    });
  }, [])
  useEffect (() => {
    if (query) updateSearch (query);
  }, [query]);
  return (
    <div className="grid search-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input value={query} onChange={setQuery} placeholder="Search..." />
        <img src={SearchIcon} />
      </form>
      <span onClick={openFilter} className="open-filters">
        <img src={FilterSVG} />
      </span>
    </div>
  )
}

export default Search
