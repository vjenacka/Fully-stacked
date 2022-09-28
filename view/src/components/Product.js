import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const [isHovered, setHover] = useState(false);
  const { user } = useAuthContext();

  const style = {
    visibility: isHovered ? "visible" : "hidden",
  };

  const handleAddCart = async () => {
    if (!user) {
      toast.info("You need to be logged in to add a product to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return;
    }
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ product_id: product.id }),
    });

    if (response.ok)
      toast.success("Product added to cart", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
      });
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
