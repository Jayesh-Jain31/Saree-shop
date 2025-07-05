import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items.</p> :
        cartItems.map(item => (
          <div key={item._id}>
            {item.name} x {item.qty} – ₹{item.price * item.qty}
          </div>
        ))
      }
      <h3>Total: ₹{total}</h3>
      <button onClick={() => navigate('/checkout')}>Checkout</button>
    </div>
  );
};

export default Cart;
