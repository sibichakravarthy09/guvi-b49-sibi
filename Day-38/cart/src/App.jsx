import { Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import Cart from './components/Cart';
import { data } from './data'
import { createContext, useState } from 'react';

export const ProductsContext = createContext()

function App() {
  const [state, setState] = useState({
    productList: data,
    cart: []
  })
  // console.log(state.cart)

  const handleAddToCart = (pd) => {
    setState({
      ...state,
      cart: state.cart.find((cartItem) => cartItem.id === pd.id)
        ? state.cart.map((cartItem) => cartItem.id === pd.id
          ? {...cartItem, count: cartItem.count + 1}
          : cartItem
          )
        :[...state.cart, {...pd, count: 1}]
    })
  }
  // console.log(state.cart)

  const handleIncrease = (pID) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) => cartItem.id === pID
        ? {...cartItem, count: cartItem.count + 1}
        : cartItem)
    })
  }

  const handleDecrease = (pID) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) => cartItem.id === pID
        ? {...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1}
        : cartItem)
    })
  }

  const handleRemoveFromCart = (pID) => {
    setState({
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== pID)
    })
  }

  return (
    <ProductsContext.Provider value={{ state, handleAddToCart, handleIncrease, handleDecrease, handleRemoveFromCart}}>
      <div className="App">
        <h1>My Phone Store</h1>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </ProductsContext.Provider>
  );
}

export default App;