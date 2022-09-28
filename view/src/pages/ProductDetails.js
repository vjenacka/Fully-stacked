import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);

  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const response = await fetch(`/api/product/${id}`);
      const json = await response.json();

      if (response.ok) setProduct(json);

      setLoading(false);
    };

    fetchProduct(id);
  }, [id]);

  const handleAddCart = async () => {
    if (!user) {
      toast.info("You need to be logged in to add a product to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return;
    }
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ product_id: id }),
    });

    if (response.ok)
      toast.success("Product added to cart", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
      });
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
