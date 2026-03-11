import React from 'react'

const ProductModel = ({product, closeModal}) => {
  return (
    <div className='modal-overlay'>
        <div className='modal'>

            
            <img src={product.image} width="150" />

            <h2>{product.title}</h2>

            <p>Price: ${product.price}</p>

            <p>Category: {product.category}</p>

            <p>{product.description}</p>

            <button onClick={closeModal} className='close-button'>
                Close
            </button>

        </div>
      
    </div>
  )
}

export default ProductModel
