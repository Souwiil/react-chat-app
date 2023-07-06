import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
    const [searchValue, setSearchValue] = useState('');
  
    const handleChange = (event) => {
      setSearchValue(event.target.value);
      handleSearch(event.target.value);
    };
  
    return (
      <div className="flex items-center justify-center mt-2 w-auto ">
        <input
          type="text"
          className="search-input border-none rounded-lg  p-2 outline-none"
          placeholder="Rechercher un contact"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
    );
  };
  
  export default Search;