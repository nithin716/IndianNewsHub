import React, { useState } from 'react';
import { INDIAN_STATES, NEWS_CATEGORIES } from '../data/constants';

const SearchFilters = ({ onSearch, onStateFilter, onCategoryFilter, onRefresh }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      onSearch(searchKeyword.trim());
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    if (state) {
      onStateFilter(state);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category && category !== 'All Categories') {
      onCategoryFilter(category);
    } else {
      onRefresh(); // Reset to default news when "All Categories" is selected
    }
  };

  const handleClearFilters = () => {
    setSearchKeyword('');
    setSelectedState('');
    setSelectedCategory('All Categories');
    onRefresh();
  };

  return (
    <div className="filter-section">
      <div className="row g-3">
        {/* Search Bar */}
        <div className="col-md-4">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search news..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button className="btn btn-news-primary" type="submit">
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </form>
        </div>

        {/* State Filter */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {NEWS_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="col-md-2">
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-secondary flex-grow-1" 
              onClick={handleClearFilters}
              title="Clear all filters"
            >
              Clear
            </button>
            <button 
              className="btn btn-news-primary flex-grow-1" 
              onClick={onRefresh}
              title="Refresh news"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;