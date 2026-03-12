import React, { useContext } from 'react'
import Products from './pages/Products'
import { CartProvider } from './context/CartContext'
import { ThemeContext, ThemeProvider } from './context/ThemeContext'

const App = () => {

  const {theme} = useContext(ThemeContext);
  return (
    <div className={theme}>
      <CartProvider>
        <Products />
      </CartProvider>
    </div>
  )
}

export default App
