// components/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/cartSlice';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const increaseQuantity = (id) => {
    dispatch(incrementQuantity(id));
  }

  const decreaseQuantity = (id) => {
    dispatch(decrementQuantity(id));
  }

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    cartItems.forEach(item => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.price * item.quantity;
    });
    return totalAmount;
  }

  return (
    <div>
      <h1>Cart Page</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                {item.quantity}
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Total Quantity: {calculateTotalQuantity()}</p>
        <p>Total Amount: ${calculateTotalAmount()}</p>
      </div>
    </div>
  );
}

export default CartPage;
