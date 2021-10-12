import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase()); //toLowerCase() will convert all the search query to lowercase
  };
  return (
    <>
      {/* Creating input field for Search */}
      <input
        type="search"
        placeholder="Filter"
        value={keyword}
        onChange={handleSearchChange}
        className="form-control mb-4"
      />
    </>
  );
};

export default LocalSearch;
