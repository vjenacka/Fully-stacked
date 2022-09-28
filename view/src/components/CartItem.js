import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";

const CartItem = ({ product, addToTotal, removeFromTotal }) => {
  const { dispatch } = useCartContext();
  const { user } = useAuthContext();
  //remove cart item and update db
  const handleRemoveItem = async () => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ product_id: product.product_id }),
    });

    if (res.ok) {
      //remove total price of quantity of items
      const total = Number((product.price * product.count).toFixed(2));
      removeFromTotal(total);
      dispatch({ type: "REMOVE_CART_ITEM", payload: product.product_id });
    }
  };
  //add one to quantity and update db
  const handleAddOne = async () => {
    const res = await fetch("/api/cart/add", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ product_id: product.product_id }),
    });

    if (res.ok) {
      dispatch({ type: "ADD_ONE", payload: product.product_id });
      addToTotal(Number(product.price));
    }
  };
  //remove one from quantity and update db
  const handleRemoveOne = async () => {
    if (product.count <= 1) return;

    const res = await fetch("/api/cart/remove", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ product_id: product.product_id }),
    });

    if (res.ok) {
      removeFromTotal(Number(product.price));
      dispatch({ type: "REMOVE_ONE", payload: product.product_id });
    }
  };
  return (
    <tr className="cart-item">
      <td>{product.name}</td>
      <td>{product.price} KM</td>
      <td>
        <button
          className="count-btn"
          disabled={product.count > 1 ? "" : true}
          onClick={handleRemoveOne}
        >
          -
        </button>{" "}
        {product.count}{" "}
        <button className="count-btn" onClick={handleAddOne}>
          +
        </button>
      </td>
      <td>{(product.price * product.count).toFixed(2)} KM</td>
      <td>
        <button className="remove-btn" onClick={handleRemoveItem}>
          X
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
