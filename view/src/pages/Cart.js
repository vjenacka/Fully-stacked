import React, { useState } from "react";
import CartItem from "../components/CartItem";

function Cart() {
  const [products, setProducts] = useState([
    {
      product_id: 1,
      count: 1,
      name: "Mlijeko svježe 2,8%mm 1L Meggle",
      price: "2.20",
    },
    {
      product_id: 2,
      count: 1,
      name: "PŠENIČNO BIJELO BRAŠNO TIP 500",
      price: "27.95",
    },
    {
      product_id: 3,
      count: 2,
      name: "Deterdžent za suđe apple 800ml Fairy",
      price: "3.95",
    },
    {
      product_id: 4,
      count: 4,
      name: "Palmolive Šampon long&shine 350 ml",
      price: "2.45",
    },
  ]);
  return (
    <main>
      <div className="cart">
        <h2>Shopping Cart</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>AMOUNT</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <CartItem key={product.product_id} product={product}></CartItem>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Cart;
