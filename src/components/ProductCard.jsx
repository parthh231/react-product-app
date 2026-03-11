import React from "react";

const ProductCard = ({ product, openModal, addToCart }) => {

  return (
    <div className="card">

      <img src={product.image} alt={product.title} width="100" />

      <h3>{product.title}</h3>

      <p>${product.price}</p>

      <p>{product.category}</p>

      <button onClick={() => openModal(product)}>
        View Details
      </button>

      <button onClick={() => addToCart(product)}>
        Add To Cart
      </button>

    </div>
  );
};

export default ProductCard;