import React from "react";

const CartItem = ({ product }) => {
  return (
    <tr className="cart-item">
      <td>{product.name}</td>
      <td>{product.price} KM</td>
      <td>{product.count}</td>
      <td>{Number(product.price) * product.count} KM</td>
      <td>
        <button>X</button>
      </td>
    </tr>
  );
};

export default CartItem;
