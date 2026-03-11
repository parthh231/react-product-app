import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/api';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import ProductModel from '../components/ProductModel';
import CartModal from '../components/CartModal';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const productsPerPage = 5;

    useEffect(()=>{
        getProducts().then((res)=> {
            setProducts(res.data);
        }).catch((error) => {
            console.error('Error fetching products:', error);
        });
    },[]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);

    useEffect(() => {
        const timer = setTimeout(()=> {
            setDebouncedSearch(search);
        },500);

        return () => clearTimeout(timer);
    },[search]);

    //search + filter
    const filteredProducts = products.filter((product) => {
        const matchSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

       const matchCategory =
        category === "all" || product.category === category;
         
       return matchSearch && matchCategory;          
    });

   
    //Pagination
    // const indexOfLast = currentPage * productsPerPage;
    // const indexOfFirst = indexOfLast - productsPerPage;

    const currentProducts = filteredProducts.slice(0, visibleCount);

    //Scroll function
    useEffect(() => {
        const handleScroll = () => {
        if(
            window.innerHeight + document.documentElement.scrollTop 
            >= document.documentElement.scrollHeight -50
        ){
            setVisibleCount((prev) => prev + 5);
        }
    };
        window.addEventListener("scroll", handleScroll);
 
        return () => window.removeEventListener("scroll", handleScroll);
    },[])

    //Add To Cart function

    const addToCart = (product) => {
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

    // Remove from cart function
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };

  return (
    <div>
        <div className='header'>
            <div className='search-filter'>
                <SearchBar setSearch={setSearch} />
                <Filter setCategory={setCategory} />
            </div>
            <div className='cart-badge'>
                <h2 onClick={() => setShowCart(true)}>🛒 Cart ({cart.length})</h2>
                
            </div>
        </div>

        <div className='grid'>
            {currentProducts.map((product) => (
                <ProductCard 
                key={product.id} 
                product={product} 
                openModal={setSelectedProduct}
                addToCart = {addToCart}  
                />
            ))}
        </div>

    {visibleCount < filteredProducts.length && (
    <p style={{ textAlign: "center" }}>
    Loading more products...
  </p>
)}

        {/* <Pagination 
          total={filteredProducts.length}
          perPage={productsPerPage}
          setCurrentPage={setCurrentPage}
        />   */}

    {selectedProduct && (
    <ProductModel
    product={selectedProduct}
    closeModal={() => setSelectedProduct(null)}
    />
    )}

    {showCart && (
      <CartModal
        cart={cart}
        closeCart={() => setShowCart(false)}
        removeFromCart={removeFromCart}
      />
    )}
    </div>
  );
};

export default Products
