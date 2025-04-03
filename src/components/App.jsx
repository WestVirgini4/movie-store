import React, { useState, useEffect } from 'react';
import Cart from './Cart';

const API_KEY = '40cd7b64aa05f4f8de911cf3571e8186';
const API_URL = 'https://api.themoviedb.org/3/search/movie';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [total, setTotal] = useState(0);


  const fetchMovies = async (query) => {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(searchQuery);
    }
  }, [searchQuery]);

  const addToCart = (movie) => {
    const updatedCart = [...cart, movie];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  const updateTotal = (cart) => {
    let totalAmount = cart.length * 20;
    if (cart.length > 5) totalAmount *= 0.8; 
    else if (cart.length > 3) totalAmount *= 0.9; 
    setTotal(totalAmount);
  };
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto p-4 flex">
        {/* ความกว้างของหน้าเว็บ*/}
        <div className="flex-grow pr-96">
          {/* ช่องค้นหา */}
          <input
            type="text"
            className="w-full p-3 bg-white text-blue-800 border border-blue-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search movies..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* ลิสต์รายการหนัง */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-md shadow-lg overflow-hidden hover:scale-105 transition transform duration-300">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-blue-800">{movie.title}</h3>
                  <p className="text-sm text-gray-600">{movie.overview}</p>
                  <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition duration-300"
                    onClick={() => addToCart(movie)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ตระกร้าสินค้า */}
        <Cart cart={cart} total={total} />
      </div>      
    </div>
  );
}

export default App;





