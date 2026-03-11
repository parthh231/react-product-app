import React from 'react'

const CartModal = ({cart, closeCart, removeFromCart}) => {

    const totalPrice = cart.reduce(
        (total,item) => total + item.price * item.quantity,0
    );

  return (
    <div className='modal-overlay'>
        <div className='modal cart-modal'>
            <h2>Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map((item)=> (
                    <div key={item.id} className='cart-item'>

                        <p><strong>{item.title}</strong></p>

                        <p>
                           ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <button onClick={() => removeFromCart(item.id)} className='delete-btn'>
                            ✕ Remove
                        </button>
                    </div>
                    ))}

                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                </>
            )}

            <button onClick={closeCart} className='close-btn'>
                Close
            </button>

        </div>
    </div>
  );
};

export default CartModal;
