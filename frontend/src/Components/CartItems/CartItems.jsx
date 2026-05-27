// import React, { useContext } from 'react';
// import './CartItems.css';
// import { ShopContext } from '../../Context/ShopContext';
// import remove_icon from '../Assets/cart_cross_icon.png';

// const CartItems = () => {
//     const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
//     return (
//         <div className='cartitems'>
//             <div className="cartitems-format-main">
//                 <p>Product</p>
//                 <p>Title</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             {all_product.map((e) => {
//                 if (cartItems[e.id] > 0) {
//                     return (
//                         <div key={e.id}>
//                             <div className="cartitems-format cartitems-format-main">
//                                 <img src={e.image} alt="" className='carticon-product-icon' />
//                                 <p>{e.name}</p>
//                                 <p>${e.new_price}</p>
//                                 <button className="cartitems-quantity">{cartItems[e.id]}</button>
//                                 <p>${e.new_price * cartItems[e.id]}</p>
//                                 <img src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
//                             </div>
//                             <hr />
//                         </div>
//                     )
//                 }
//                 return null;
//             })}
//             <div className="cartitems-down">
//                 <div className="cartitems-total">
//                     <h1>Cart Totals</h1>
//                     <div>
//                         <div className="cartitems-total-item">
//                             <p>Subtotal</p>
//                             <p>${getTotalCartAmount()}</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <p>Shipping Fee</p>
//                             <p>Free</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <h3>Total</h3>
//                             <h3>${getTotalCartAmount()}</h3>
//                         </div>
//                     </div>
//                     <button>PROCEED TO CHECKOUT</button>
//                 </div>
//                 <div className="cartitems-promocode">
//                     <p>If you have a promo code, Enter it here.</p>
//                     <div className="cartitems-promobox">
//                         <input type="text" placeholder='promo code' />
//                         <button>Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CartItems;








import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();
  const deliveryFee = totalAmount > 0 ? 50 : 0;

  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id}>
              <div className='cartitems-format'>
                <img src={product.image} alt={product.name} className='cartitems-product-icon' />
                <p className='cartitems-product-title'>{product.name}</p>
                <p>₹{product.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                <p>₹{product.new_price * cartItems[product.id]}</p>
                <img
                  src={remove_icon}
                  alt='remove'
                  onClick={() => removeFromCart(product.id)}
                  className='cartitems-remove-icon'
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>Cart Totals</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>Subtotal</p>
              <p>₹{totalAmount}</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3>₹{totalAmount + deliveryFee}</h3>
            </div>
          </div>
          <button
            onClick={() => navigate('/placeorder')}
            disabled={totalAmount === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className='cartitems-promocode'>
          <p>If you have a promo code, enter it here</p>
          <div className='cartitems-promobox'>
            <input type='text' placeholder='Promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
