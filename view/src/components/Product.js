import React, { useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [isHovered, setHover] = useState(false);
  const style = {
    visibility: isHovered ? "visible" : "hidden",
  };

  const handleAddCart = async () => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "1375cba6-2901-4639-a4b0-01b66794ed4b",
        product_id: product.id,
      }),
    });

    const json = await response.json();

    if (response.ok) console.log("product added", json);
  };
  return (
    <div
      className="product"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/product/${product.id}`}>
        <img src={product.img_url} alt={product.name} />
        <div>
          <h4>{product.name}</h4>
          <p>{product.price} KM</p>
        </div>
      </Link>
      <button style={style} onClick={() => handleAddCart()}>
        Add to cart
      </button>
    </div>
  );
};

export default Product;
