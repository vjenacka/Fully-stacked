import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutDetail from "../components/CheckoutDetail";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthContext } from "../hooks/useAuthContext";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [total, setTotal] = useState(0);
  const { user } = useAuthContext();
  const navigate = useNavigate();

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
          sum += Number((ele.price * ele.count).toFixed(2));
        });
        setTotal(sum);
      }
    };

    getCart();
  }, [user.token]);

  const handlePayment = async () => {
    //get current date
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateStr = `${day}/${month}/${year}`;

    const order = {
      date: dateStr,
      total_cost: Number(total.toFixed(2)),
      products: cart,
    };

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ order }),
    });

    if (response.ok) {
      toast.success("Order placed!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
      });
      navigate("/orders");
    }
  };
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
            <button onClick={handlePayment}>Pay with Stripe</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
