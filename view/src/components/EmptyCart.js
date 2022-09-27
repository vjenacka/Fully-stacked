import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function EmptyCart() {
  return (
    <div className="cart-empty">
      <FaShoppingCart />
      <p>Cart is Empty</p>
      <Link to={"/"}>Continue shopping</Link>
    </div>
  );
}

export default EmptyCart;
