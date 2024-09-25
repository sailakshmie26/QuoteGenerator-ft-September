import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/quotes');
      const quotes = response.data.quotes;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex].quote);
    } catch (error) {
      console.error('Error fetching the quote', error);
    }
  };

  const toggleFavorite = () => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(quote)) {
        return prevFavorites.filter(fav => fav !== quote);
      } else {
        return [...prevFavorites, quote];
      }
    });
  };

  const toggleShowFavorites = () => {
    setShowFavorites(prevShow => !prevShow); 
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className='container d-flex justify-content-center align-items-center' 
         style={{ height: '100vh', backgroundColor: '#040D12', maxWidth: '100vw' }}>
      <div style={{ backgroundColor: '#B5CFB7', padding: '40px', borderRadius: '8px', textAlign: 'center', maxWidth: '90vw' }}>
        <h1 style={{ fontSize: '45px', fontWeight: 'bolder' }}>Quote Generator</h1>
        <p style={{ fontSize: '30px' }}>"{quote}"</p>      
        
        <button onClick={fetchQuote} className='btn w-25' 
                style={{ fontSize: '22px', fontWeight: 'bolder', backgroundColor: '#557C56' }}>
          Next
        </button>
        
        <button onClick={toggleFavorite} style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px' }}>
          <i className={`fa${favorites.includes(quote) ? 's' : 'r'} fa-heart`} 
             style={{ fontSize: '30px', color: favorites.includes(quote) ? '#dc3545' : '#1A3636' }}></i>
        </button>

        <button onClick={toggleShowFavorites} className='btn w-auto' 
                style={{ fontSize: '22px', fontWeight: 'bolder', backgroundColor: '#1A3636', marginLeft:'8px', color:'white'}}>
          {showFavorites ? 'Hide Favorites' : 'Show Your Favorites'}
        </button>

        {showFavorites && (
          <div style={{ marginTop: '20px' }}>
            <h2>Your Favorites</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {favorites.length > 0 ? (
                favorites.map((favQuote, index) => (
                  <li key={index} style={{ fontSize: '20px' }}>"{favQuote}"</li>
                ))
              ) : (
                <li style={{ fontSize: '20px' }}>No favorites yet!</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteGenerator;
