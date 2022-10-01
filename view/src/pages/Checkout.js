import React, { useEffect, useState } from "react";
import CheckoutDetail from "../components/CheckoutDetail";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthContext } from "../hooks/useAuthContext";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [total, setTotal] = useState(0);
  const { user } = useAuthContext();

  useEffect(() => {
    const getCart = async () => {
      const response = await fetch("/api/checkout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      let sum = 0;
      if (response.ok) {
        setCart(json.cart);
        setUserDetails(json.user);

        json.cart.forEach(ele => {
          console.log(ele);
          sum += Number((ele.price * ele.count).toFixed(2));
        });
        setTotal(sum);
      }
    };

    getCart();
  }, []);

  const handlePayment = () => {};
  return (
    <>
      {!cart ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="checkout">
          <h4>Checkout</h4>
          <p>Order summary</p>
          <ul>
            {cart.map(product => {
              return (
                <CheckoutDetail
                  key={product.product_id}
                  product={product}
                ></CheckoutDetail>
              );
            })}
          </ul>
          <p>
            Total: <span>{total.toFixed(2)} KM</span>
          </p>
          <div className="checkout-payment">
            <button onClick={handlePayment()}>Pay with Stripe</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
