import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const BACKEND = "https://e-commerce-backend-ac08.onrender.com";

const PlaceOrder = () => {
  const { getTotalCartAmount, all_product, cartItems, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    zipcode: '', country: '', phone: '',
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getCartItems = () => {
    return all_product
      .filter((p) => cartItems[p.id] > 0)
      .map((p) => ({ ...p, quantity: cartItems[p.id] }));
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const finalAmount = subtotal + deliveryFee;

  const validateForm = () => {
    if (Object.values(formData).some((f) => f.trim() === '')) {
      alert('Please fill all fields');
      return false;
    }
    return true;
  };

  const clearCart = () => {
    let emptyCart = {};
    for (let i = 0; i < 300; i++) emptyCart[i] = 0;
    setCartItems(emptyCart);
  };

  // ── RAZORPAY ─────────────────────────────────────────────────
  const handleRazorpay = async () => {
    if (!localStorage.getItem('auth-token')) {
      alert('Please login first');
      return navigate('/login');
    }
    if (!validateForm()) return;

    const token = localStorage.getItem('auth-token');

    // 1. Create order on backend
    const res = await fetch(`${BACKEND}/createrazorpayorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': token },
      body: JSON.stringify({ amount: finalAmount, address: formData, items: getCartItems() }),
    });
    const data = await res.json();
    if (!data.success) return alert('Order creation failed. Try again.');

    // 2. Open Razorpay Checkout
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: 'E-Commerce Store',
      description: 'Order Payment',
      order_id: data.razorpayOrderId,
      handler: async (response) => {
        // 3. Verify payment on backend
        const verifyRes = await fetch(`${BACKEND}/verifyrazorpay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'auth-token': token },
          body: JSON.stringify({ ...response, orderId: data.orderId }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          clearCart();
          alert('Payment Successful! 🎉');
          navigate('/orders');
        } else {
          alert('Payment verification failed. Contact support.');
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: '#ff4141' },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => alert('Payment failed. Please try again.'));
    rzp.open();
  };

  // ── COD ───────────────────────────────────────────────────────
  const handleCOD = async () => {
    if (!localStorage.getItem('auth-token')) {
      alert('Please login first');
      return navigate('/login');
    }
    if (!validateForm()) return;

    const cartItems = getCartItems();

    // EMPTY CART CHECK
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // AMOUNT CHECK
    if (finalAmount <= 0) {
      alert("Invalid order amount!");
      return;
    }

    const token = localStorage.getItem('auth-token');

    const res = await fetch(`${BACKEND}/placeorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': token },
      body: JSON.stringify({ amount: finalAmount, address: formData, items: getCartItems() }),
    });
    const data = await res.json();
    if (data.success) {
      clearCart();
      alert('Order Placed! 🎉 Pay on delivery.');
      navigate('/orders');
    } else {
      alert('Order failed. Try again.');
    }
  };

  return (
    <div className='placeorder'>

      {/* ── LEFT: Address Form ── */}
      <div className='placeorder-left'>
        <p className='placeorder-title'>Delivery Information</p>
        <div className='placeorder-row'>
          <input name='firstName' onChange={onChangeHandler} value={formData.firstName} placeholder='First name' />
          <input name='lastName' onChange={onChangeHandler} value={formData.lastName} placeholder='Last name' />
        </div>
        <input name='email' onChange={onChangeHandler} value={formData.email} placeholder='Email address' />
        <input name='street' onChange={onChangeHandler} value={formData.street} placeholder='Street' />
        <div className='placeorder-row'>
          <input name='city' onChange={onChangeHandler} value={formData.city} placeholder='City' />
          <input name='state' onChange={onChangeHandler} value={formData.state} placeholder='State' />
        </div>
        <div className='placeorder-row'>
          <input name='zipcode' onChange={onChangeHandler} value={formData.zipcode} placeholder='Zip code' />
          <input name='country' onChange={onChangeHandler} value={formData.country} placeholder='Country' />
        </div>
        <input name='phone' onChange={onChangeHandler} value={formData.phone} placeholder='Phone number' />
      </div>

      {/* ── RIGHT: Summary + Payment ── */}
      <div className='placeorder-right'>

        <div className='placeorder-total'>
          <h2>Cart Totals</h2>
          <div className='placeorder-total-item'><p>Subtotal</p><p>₹{subtotal}</p></div>
          <hr />
          <div className='placeorder-total-item'><p>Delivery Fee</p><p>₹{deliveryFee}</p></div>
          <hr />
          <div className='placeorder-total-item'><b>Total</b><b>₹{finalAmount}</b></div>
        </div>

        <div className='placeorder-payment'>
          <p>Select Payment Method</p>
          <button className='btn-razorpay' onClick={handleRazorpay}>
            💳 Pay with Razorpay
          </button>
          <button className='btn-cod' onClick={handleCOD}>
            🏠 Cash on Delivery
          </button>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrder;
