import React, { useContext } from 'react'
import Products from './pages/Products'
import { CartProvider } from './context/CartContext'
import { ThemeContext, ThemeProvider } from './context/ThemeContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const {theme} = useContext(ThemeContext);
  return (
    <div className={theme}>
      <CartProvider>
        <Products />
      </CartProvider>
      <ToastContainer />
    </div>
  )
}

export default App
