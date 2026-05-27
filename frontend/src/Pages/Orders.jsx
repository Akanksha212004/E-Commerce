import React, { useEffect, useState } from 'react';
import './Orders.css';

const BACKEND = 'http://localhost:4000';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('auth-token');
      if (!token) { setLoading(false); return; }

      const res  = await fetch(`${BACKEND}/myorders`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'auth-token': token },
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <div className='orders-loading'>Loading your orders...</div>;

  if (orders.length === 0) {
    return (
      <div className='orders-empty'>
        <h2>No orders yet!</h2>
        <p>Looks like you haven't placed any orders.</p>
      </div>
    );
  }

  return (
    <div className='orders'>
      <h2 className='orders-title'>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className='orders-card'>
          <div className='orders-card-header'>
            <div>
              <span className='orders-label'>Order ID:</span>
              <span className='orders-value'>{order._id}</span>
            </div>
            <div>
              <span className='orders-label'>Date:</span>
              <span className='orders-value'>{new Date(order.date).toLocaleDateString('en-IN')}</span>
            </div>
            <div>
              <span className='orders-label'>Payment:</span>
              <span className='orders-value orders-method'>
                {order.paymentMethod === 'razorpay' ? '💳 Razorpay' : '🏠 Cash on Delivery'}
              </span>
            </div>
            <div>
              <span className={`orders-status orders-status--${order.status.replace(/\s/g, '').toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>

          <div className='orders-items'>
            {order.items.map((item, idx) => (
              <div key={idx} className='orders-item'>
                <img src={item.image} alt={item.name} />
                <div>
                  <p className='orders-item-name'>{item.name}</p>
                  <p className='orders-item-qty'>Qty: {item.quantity}</p>
                </div>
                <p className='orders-item-price'>₹{item.new_price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className='orders-card-footer'>
            <p>
              <span className='orders-label'>Delivery to:</span>
              {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipcode}
            </p>
            <p className='orders-total'>Total Paid: <b>₹{order.amount}</b></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
