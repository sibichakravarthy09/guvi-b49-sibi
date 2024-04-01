import React, { useContext } from 'react';
import { ProductsContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
    const context = useContext(ProductsContext);
    const cartCount = context.state.cart.reduce((acc, product) => acc += product.count, 0);
    const totalPrice = context.state.cart.reduce((acc, product) => acc += product.price * product.count, 0);
    const navigate = useNavigate();
    
    return (
        <div className="cart">
            <nav className="nav">
                <button onClick={()=>navigate("/")}>Products</button>
                <button onClick={()=>navigate("/cart")}>Cart <span>({cartCount})</span></button>
            </nav>
            <div className="cart-products-container">
            {context.state.cart.map((product) => (
                <div key={product.id} className="cart-product-card">
                    <div>
                        <img className="cartproduct-poster" src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <h4>Price: ${product.price}</h4>
                    </div>
                    <div className="cart-product-details">
                        <p>Quantity: {product.count}</p>
                        <div>
                            <button className="btn btn-decrease" onClick={() => context.handleDecrease(product.id)}>-</button>
                            <button className="btn btn-remove" onClick={() => context.handleRemoveFromCart(product.id)}>Remove</button>
                            <button className="btn btn-increase" onClick={() => context.handleIncrease(product.id)}>+</button>
                        </div>
                        <h3>Subtotal: ${(product.price * product.count).toFixed(2)}</h3>
                    </div>
                </div>
            ))}
            </div>
            <h2>Total Quantity: {cartCount} items, Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
    );
}
