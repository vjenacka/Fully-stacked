const Category = ({ category, handleCategoryChange }) => {
  return (
    <form>
      <label>
        Filter products by category:
        <select onChange={e => handleCategoryChange(e.target.value)}>
          <option value="">All products</option>
          {category.map((value, i) => {
            return (
              <option key={i} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </label>
    </form>
  );
};

export default Category;
