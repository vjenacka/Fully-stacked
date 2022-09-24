import React from "react";
import { useCartContext } from "../hooks/useCartContext";

const CartItem = ({ product, addToTotal, removeFromTotal }) => {
  const { dispatch } = useCartContext();
  //remove cart item from db and in client
  const handleRemoveItem = async () => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "1375cba6-2901-4639-a4b0-01b66794ed4b",
        product_id: product.product_id,
      }),
    });
    const json = await res.json();

    if (res.ok) {
      //remove total price of quantity of items
      const total = Number((product.price * product.count).toFixed(2));
      removeFromTotal(total);
      dispatch({ type: "REMOVE_CART_ITEM", payload: product.product_id });
    }
  };
  //add one to quantity of item in db and update count client side
  const handleAddOne = async () => {
    const res = await fetch("/api/cart/add", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "1375cba6-2901-4639-a4b0-01b66794ed4b",
        product_id: product.product_id,
      }),
    });
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "ADD_ONE", payload: product.product_id });
      addToTotal(product.price);
    }
  };
  return (
    <tr className="cart-item">
      <td>{product.name}</td>
      <td>{product.price} KM</td>
      <td>
        <button className="count-btn" disabled={product.count > 1 ? "" : true}>
          -
        </button>{" "}
        {product.count}{" "}
        <button className="count-btn" onClick={() => handleAddOne()}>
          +
        </button>
      </td>
      <td>{(product.price * product.count).toFixed(2)} KM</td>
      <td>
        <button className="remove-btn" onClick={() => handleRemoveItem()}>
          X
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
