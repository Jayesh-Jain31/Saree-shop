import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const [address, setAddress] = useState({ name: '', address: '', city: '', state: '', postalCode: '', country: 'India' });
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY');

  const itemsPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const taxPrice = Math.round(itemsPrice * 0.05);
  const shippingPrice = 0;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const placeOrder = async () => {
    // Force Razorpay for Jodhpur
    const method = address.city.trim().toLowerCase() === 'jodhpur' ? 'RAZORPAY' : paymentMethod;
    const { data } = await axios.post('/api/orders', {
      orderItems: cartItems,
      shippingAddress: address,
      paymentMethod: method,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    alert('Order placed! ID: ' + data._id);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input placeholder="Name" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
      <input placeholder="Address" value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })} />
      <input placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
      <input placeholder="State" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
      <input placeholder="PIN" value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} />

      {address.city.trim().toLowerCase() !== 'jodhpur' && (
        <div>
          <label>
            <input type="radio" value="RAZORPAY" checked={paymentMethod === 'RAZORPAY'} onChange={e => setPaymentMethod(e.target.value)} /> Pay Online (Razorpay)
          </label>
          <label>
            <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={e => setPaymentMethod(e.target.value)} /> Cash on Delivery
          </label>
        </div>
      )}

      {address.city.trim().toLowerCase() === 'jodhpur' && (
        <p>🚚 Fast 10‑minute delivery in Jodhpur & payment via Razorpay only.</p>
      )}

      <button style={{ position: 'fixed', bottom: 20 }} onClick={placeOrder}>Place Order – ₹{totalPrice}</button>
    </div>
  );
};

export default Checkout;
