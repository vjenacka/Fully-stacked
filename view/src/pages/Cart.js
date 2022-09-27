import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCartContext } from "../hooks/useCartContext";

function Cart() {
  const { cart, dispatch } = useCartContext(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const getCart = async id => {
      const response = await fetch(
        "/api/cart/1375cba6-2901-4639-a4b0-01b66794ed4b"
      );
      const json = await response.json();

      let sum = 0;
      if (response.ok) {
        dispatch({ type: "SET_CART", payload: json });
        //calculates the total price of item quantity
        json.forEach(ele => {
          sum += Number((ele.price * ele.count).toFixed(2));
        });
        setTotal(sum);
      }
    };

    getCart();
  }, []);

  const addToTotal = val => {
    const newTotal = Number((total + val).toFixed(2));
    setTotal(newTotal);
  };

  const removeFromTotal = val => {
    const newTotal = Number(total - parseFloat(val).toFixed(2));
    setTotal(newTotal);
  };

  return (
    <main>
      {cart === null ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="cart">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <EmptyCart></EmptyCart>
          ) : (
            <>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <CartItem
                      key={item.product_id}
                      product={item}
                      addToTotal={addToTotal}
                      removeFromTotal={removeFromTotal}
                    />
                  ))}
                </tbody>
              </table>
              <p>
                <span>Total cost:</span> {total.toFixed(2)} KM
              </p>
            </>
          )}
        </div>
      )}
    </main>
  );
}

export default Cart;
