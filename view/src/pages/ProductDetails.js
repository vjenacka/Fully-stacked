import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCartContext } from "../hooks/useCartContext";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const { dispatch } = useCartContext();

  useEffect(() => {
    const fetchProduct = async id => {
      setLoading(true);
      const response = await fetch(`/api/product/${id}`);
      const json = await response.json();

      if (response.ok) setProduct(json);

      setLoading(false);
    };

    fetchProduct(id);
  }, []);

  const handleAddCart = async () => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "1375cba6-2901-4639-a4b0-01b66794ed4b",
        product_id: id,
      }),
    });

    const json = await response.json();

    if (response.ok) console.log("product added", json);
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="product-details">
          <img src={product.img_url} alt={product.name} />
          <div className="details">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <hr />
            <div>
              <span>{product.price} KM</span>
              <button onClick={() => handleAddCart()}>Add to cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
