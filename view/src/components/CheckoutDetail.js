import React from "react";

const CheckoutDetail = ({ product }) => {
  return (
    <div className="checkout-details">
      <img src={`${product.img_url}`} alt={`${product.name}`} />
      <div>
        <p>{product.name}</p>
        <p>{(product.price * product.count).toFixed(2)} KM</p>
        <span>Quantity: {product.count}</span>
      </div>
    </div>
  );
};

export default CheckoutDetail;
