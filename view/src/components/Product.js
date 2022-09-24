import React, { useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [isHovered, setHover] = useState(false);
  const style = {
    visibility: isHovered ? "visible" : "hidden",
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
          <button style={style}>Add to cart</button>
        </div>
      </Link>
    </div>
  );
};

export default Product;
