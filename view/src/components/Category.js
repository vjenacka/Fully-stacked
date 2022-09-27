const Category = ({ category, handleCategoryChange }) => {
  return (
    <div className="filter-products">
      <label htmlFor="product-select">Filter products by category:</label>
      <select
        id="product-select"
        onChange={e => handleCategoryChange(e.target.value)}
      >
        <option value="">All products</option>
        {category.map((value, i) => {
          return (
            <option key={i} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Category;
