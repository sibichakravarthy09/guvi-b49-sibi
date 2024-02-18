// src/CartPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

function CartPage() {
  const { cartItems, updateItemQuantity, removeItemFromCart, cartTotalQuantity, cartTotalAmount } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    updateItemQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cartItems.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
            />
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <p>Total Quantity: {cartTotalQuantity}</p>
        <p>Total Amount: ${cartTotalAmount}</p>
      </div>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
}

export default CartPage;
