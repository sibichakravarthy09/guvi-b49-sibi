import React from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/cartSlice";


const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  
  // Calculate total amount
  const totalAmount = products.reduce((total, product) => total + product.price, 0);

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  return (
    <div>
      <div className="cartWrapper">
        {products.map((product) => (
          <div className="cartCard" key={product.id}> 
            <div className="cartImg">
              <img src={product.image} alt="" />
            </div>
            <h5 className="cartTitle">{product.title}</h5>
            <h5 className="cartPrice">₹{product.price}</h5>
            <button
              className="cartBtn"
              onClick={() => handleRemove(product.id)}
            >
              <AiFillMinusCircle />
              Remove
            </button>
          </div>
        ))}
      </div>
      {/* Display total amount with style */}
      <div className="totalAmount">Total Amount: ₹{totalAmount}</div>
    </div>
  );
};

export default Cart;
