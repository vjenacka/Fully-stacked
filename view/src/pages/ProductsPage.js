import React, { useEffect, useMemo, useState } from "react";
import Products from "../components/Products";
import LoadingSpinner from "../components/LoadingSpinner";
import getUniqueCategories from "../utils/uniqueCategories";
import Category from "../components/Category";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
        //sets category options
        setCategory(getUniqueCategories(json));
      }

      setLoading(false);
    };
    console.log(category);
    fetchProducts();
  }, []);

  //handler for Category event
  function handleCategoryChange(val) {
    setSelectedCategory(val);
  }
  //filters product by select value
  function getFilteredList() {
    if (!selectedCategory) return products;

    return products.filter(product => product.category === selectedCategory);
  }
  //useMemo will recalculate filteredProducts only when dependencies change
  let filteredProducts = useMemo(getFilteredList, [products, selectedCategory]);

  return (
    <main>
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <>
          <Category
            category={category}
            handleCategoryChange={handleCategoryChange}
          ></Category>
          <Products products={filteredProducts}></Products>
        </>
      )}
    </main>
  );
};

export default ProductsPage;
