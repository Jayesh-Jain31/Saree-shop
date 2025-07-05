import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i._id === product._id);
    if(existing){
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <div>
      <h1>Sarees</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(p => (
          <ProductCard key={p._id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
