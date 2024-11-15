import React from "react";

const Filters = ({ categories, selectedCategory, setSelectedCategory }) => (
  <div className="filters-container">
    <select
      className="category-filter"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);

export default Filters;
