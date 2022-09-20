import React, { useState } from "react";

const ProductDetails = () => {
  const [product, setProduct] = useState({
    id: 1,
    name: "mlijeko",
    price: 1.3,
    img_url: "https://via.placeholder.com/150",
    description:
      "A sauce or soup base made from clarified meat stock (usually beef, veal, or poultry, but also fish) into a clear and flavorful liquid broth. Egg whites are used to clarify the meat stock as well as any additional ingredients such as vegetables and/or herbs. While the mixture is being brought to a boil, it is being stirred. The boiled solution is no longer stirred as the egg whites solidify on top of the mixture, allowing the fats and impurities to be absorbed or attached to the white.",
    category: "food",
  });
  return (
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
  );
};

export default ProductDetails;
