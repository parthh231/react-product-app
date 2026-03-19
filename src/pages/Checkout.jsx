import React from 'react'

const Checkout = ({cart}) => {

    totalPrice = cart.reduce((total,item) => {
        return total + item.price * item.quantity;
   },0);
  return (
    <div>
        <h2>Checkout</h2>

        {cart.length === 0 ?(
            <p>Your cart is empty</p>
        ) : (
            <>
            {cart.map((item) => (
                <div key={item.id}>
                    <h4>{item.title}</h4>
                    <p>Price : ${item.price}</p>
                    <p>Quantity : {item.quantity}</p>
                </div>
            ))}

            <h3>Total : ${totalPrice.toFixed(2)}</h3>

             <button>Place Order</button>
            </>
        )}
    </div>
  );
};

export default Checkout;