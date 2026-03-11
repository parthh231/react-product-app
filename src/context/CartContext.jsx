import React, { createContext, useState } from 'react'

export const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);

    const addToCart = () => {

        const existingProduct = cart.find((item) => item.id === product.id);

        if(existingProduct) {
            const updatedCart = cart.map((item) =>
                item.id === product.id 
                ? {...item, quantity:item.quantity + 1}
                : item
            );

            setCart(updatedCart);
        }else {
            setCart([...cart, { ...product, quantity: 1}]);
        }

    };

  return (
    <CartContext.Provider value={{ cart, addToCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContext
