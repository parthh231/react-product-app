import React from 'react'
import Products from './pages/Products'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <Products />
    </CartProvider>
  )
}

export default App
