import React from "react";
import { useCartContext } from "../hooks/useCartContext";

const CartItem = ({ product }) => {
  const { dispatch } = useCartContext();

  const handleClick = async () => {
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
      console.log(json);
      dispatch({ type: "REMOVE_CART_ITEM", payload: product.product_id });
    }
  };
  return (
    <tr className="cart-item">
      <td>{product.name}</td>
      <td>{product.price} KM</td>
      <td>{product.count}</td>
      <td>{product.price * product.count} KM</td>
      <td>
        <button onClick={e => handleClick()}>X</button>
      </td>
    </tr>
  );
};

export default CartItem;
