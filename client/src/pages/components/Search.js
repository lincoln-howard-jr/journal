import { useRef } from 'react';
import SearchIcon from '../../img/search.svg';
function Search ({currentValue, updateSearch}) {
  const searchRef = useRef ();
  const handleSubmit = e => {
    if (e.preventDefault) e.preventDefault ();
    updateSearch (searchRef.current.value);
  }
  const handleChange = e => {
      updateSearch (searchRef.current.value);
  }
  return (
    <div className="grid">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input defaultValue={currentValue} handleChange={handleChange} ref={searchRef} placeholder="Search..." />
        <img src={SearchIcon} onClick={handleSubmit} />
        <input type="submit" hidden />
      </form>
    </div>
  )
}

export default Search
