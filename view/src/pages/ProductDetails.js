import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

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
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
