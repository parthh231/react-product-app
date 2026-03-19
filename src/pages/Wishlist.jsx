import React from 'react'
import ProductCard from '../components/ProductCard'

const Wishlist = ({wishlist, toggleWishlist, addToCart, closeWishlist}) => {
  return (
    <div>
      <h2>My Wishlist</h2>
      <button onClick={closeWishlist} className='close-btn'>
        Back to Products
      </button>
      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className='grid'>
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;