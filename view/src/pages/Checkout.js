import React from "react";

function Checkout() {
  return (
    <div className="checkout">
      <h4>Checkout</h4>
      <p>Order summary</p>
      <ul>
        <div className="checkout-details">
          <img src="#" alt="#" />
          <div>
            <p>Product</p>
            <p>Cijena</p>
            <span>Quantity: 1</span>
          </div>
        </div>
        <div className="checkout-details">
          <img src="#" alt="#" />
          <div>
            <p>Product</p>
            <p>Cijena</p>
            <span>Quantity: 1</span>
          </div>
        </div>
        <div className="checkout-details">
          <img src="#" alt="#" />
          <div>
            <p>Product</p>
            <p>Cijena</p>
            <span>Quantity: 1</span>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default Checkout;
