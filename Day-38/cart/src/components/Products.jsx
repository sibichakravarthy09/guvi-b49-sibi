import React, { useContext } from 'react'
import { ProductsContext } from '../App'
import { Link, useNavigate } from 'react-router-dom'

export default function Products() {
    const context = useContext(ProductsContext)
    const cartCount = context.state.cart.reduce((acc, product) => acc += product.count, 0)
    const navigate = useNavigate()
    return (
        <div className="products">
            <nav className="nav">
                <button onClick={()=>navigate("/")}>Products</button>
                <button onClick={()=>navigate("/cart")}>Cart <span>({cartCount})</span></button>
            </nav>
            <div className="products-container">
            {context.state.productList.map((product) => (
                <div key={product.id} className="product-card">
                    <img className="product-poster" src={product.thumbnail} alt={product.title} />
                    <div>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <h4>Price: $ {product.price}</h4>
                        <button className="product-addToCart-btn" onClick={() => context.handleAddToCart(product)}>Add To Cart</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}