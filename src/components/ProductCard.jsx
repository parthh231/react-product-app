import React from "react";

const ProductCard = ({ product, openModal, addToCart, toggleWishlist, wishlist = [] }) => {
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="card">

      <img src={product.image} alt={product.title} width="100" />

      <h3>{product.title}</h3>

      <p>${product.price}</p>

    <div>
    {"⭐".repeat(Math.round(product.rating?.rate))}
    {"☆".repeat(5 - Math.round(product.rating?.rate))}
    </div>

    <p>{product.rating.rate} ({product.rating?.count} reviews)</p>

      

    <p>{product.category}</p>

      <div className="wishlist-btn-container">
        <button 
          onClick={() => toggleWishlist(product)} 
          className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
        >
          ❤️
        </button>
      </div>

      

      <button onClick={() => openModal(product)}>
        View Details
      </button>

      <button onClick={() => addToCart(product)}>
        Add To Cart
      </button>

    </div>
  );
};

export default React.memo(ProductCard);