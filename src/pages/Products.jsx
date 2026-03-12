import React, { useContext, useEffect, useState } from 'react'
import { getProducts } from '../services/api';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import ProductModel from '../components/ProductModel';
import CartModal from '../components/CartModal';
import Sort from '../components/Sort';
import SkeletonCard from '../components/SkeletonCard';
import useDebounce from '../hooks/useDebounce';
import { ThemeContext } from '../context/ThemeContext';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // const [debouncedSearch, setDebouncedSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [sortOption, setSortOption] = useState("default");
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const debouncedSearch = useDebounce(search, 500);
    const {toggleTheme, theme} = useContext(ThemeContext);

    // const productsPerPage = 5;

    useEffect(()=>{
        setLoading(true);

        getProducts()
        .then((res)=> {
            setProducts(res.data);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        })
    },[]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);

    // useEffect(() => {
    //     const timer = setTimeout(()=> {
    //         setDebouncedSearch(search);
    //     },500);

    //     return () => clearTimeout(timer);
    // },[search]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist");

        if(savedWishlist){
            setWishlist(JSON.parse(savedWishlist));
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    },[wishlist]);

    //search + filter
    const filteredProducts = products.filter((product) => {
        const matchSearch = product.title
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase());

       const matchCategory =
        category === "all" || product.category === category;
        
       return matchSearch && matchCategory;          
    });

    //Sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "priceLow") {
            return a.price - b.price;
        }

        if (sortOption === "priceHigh") {
            return b.price - a.price;
        }

        if (sortOption === "titleAZ") {
            return a.title.localeCompare(b.title);
        }

        if (sortOption === "titleZA") {
            return b.title.localeCompare(a.title);
        }

        return 0;
    });

   
    //Pagination
    // const indexOfLast = currentPage * productsPerPage;
    // const indexOfFirst = indexOfLast - productsPerPage;

    const currentProducts = sortedProducts.slice(0, visibleCount);

    //Scroll function
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop 
                >= document.documentElement.scrollHeight - 50
            ) {
                setVisibleCount((prev) => {
                    const next = Math.min(prev + 5, sortedProducts.length);
                    return next;
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sortedProducts]);

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

    //Increase Quentity Function
    const increaseQty = (id) => {
        const updatedCart = cart.map((item) => 
            item.id === id
            ? { ...item , quantity: item.quantity + 1}
            : item
        );

        setCart(updatedCart);
    };

    //Decrease Quentity Function
    const decreaseQty = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id
            ? { ...item , quantity: item.quantity - 1}
            : item
        )
        .filter((item) => item.quantity > 0);

        setCart(updatedCart);
    };

    // Remove from cart function
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };

    //wishlist function

    const toggleWishlist = (product) => {

        const exists = wishlist.find((item) => item.id === product.id);

        if (exists) {
            const updatedWishlist = wishlist.filter(
                (item) => item.id !== product.id
            );
            setWishlist(updatedWishlist);
        }else{
            setWishlist([...wishlist, product]);
        }
    };

  return (
    <div>
        <div className='header'>
            <div className='search-filter'>
                <SearchBar setSearch={setSearch} />
                <Filter setCategory={setCategory} />
                <Sort setSortOption={setSortOption} />
            </div>
            <div className='cart-badge'>
                <button onClick={toggleTheme}>
                  {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </button>
            </div>
            <div className='cart-badge'>
                <h2 onClick={() => setShowCart(true)}>🛒 Cart ({cart.length})</h2>
            </div>

            <div className='cart-badge'>
                <h2>❤️ Wishlist ({wishlist.length})</h2>

            </div>
        </div>

        <div className='grid'>
            {loading || products.length === 0
            ? Array.from({length:6}).map((_,i)=>(
                <SkeletonCard key={i} />
            ))
            
            : currentProducts.map((product) => (
                <ProductCard 
                key={product.id} 
                product={product} 
                openModal={setSelectedProduct}
                addToCart = {addToCart}  
                toggleWishlist = {toggleWishlist}
                wishlist = {wishlist}
                />
            ))}
        </div>

    {/* only show indicator when there are more items to reveal */}
    {sortedProducts.length > 0 && visibleCount < sortedProducts.length && (
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
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
      />
    )}
    </div>
  );
};

export default Products
