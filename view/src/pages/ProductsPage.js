import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);
  return (
    <main>
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <Products products={products}></Products>
      )}
    </main>
  );
};

export default ProductsPage;
