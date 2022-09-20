import React, { useState } from "react";
import Products from "../components/Products";

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "mlijeko",
      price: 1.3,
      img_url: "https://via.placeholder.com/150",
      description: "Najbolje mlijeko na svijetu samo za vase zdravlje",
      category: "food",
    },
    {
      id: 2,
      name: "brasno",
      price: 19.85,
      img_url: "https://via.placeholder.com/150",
      description: "Samo za najbolje pite i tijesto",
      category: "food",
    },
    {
      id: 3,
      name: "Detardzent",
      price: 8.2,
      img_url: "https://via.placeholder.com/150",
      description: "Da vas ves uvijek mirise",
      category: "health and cleaning",
    },
    {
      id: 4,
      name: "Head and Sholders sampon",
      price: 3.5,
      img_url: "https://via.placeholder.com/150",
      description: "Za cistu kosu bez peruti",
      category: "health and cleaning",
    },
    {
      id: 5,
      name: "Tesla TV",
      price: 660,
      img_url: "https://via.placeholder.com/150",
      description: "teslin tv",
      category: "electronics",
    },
  ]);
  return (
    <main>
      <Products products={products}></Products>
    </main>
  );
};

export default ProductsPage;
