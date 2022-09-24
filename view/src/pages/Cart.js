import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCartContext } from "../hooks/useCartContext";

function Cart() {
  const { cart, dispatch } = useCartContext();

  useEffect(() => {
    const getCart = async id => {
      const response = await fetch(
        "/api/cart/1375cba6-2901-4639-a4b0-01b66794ed4b"
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CART", payload: json });
      }
    };

    getCart();
  }, []);
  return (
    <main>
      {!cart ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
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
              {cart.map(item => (
                <CartItem key={item.product_id} product={item} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Cart;
