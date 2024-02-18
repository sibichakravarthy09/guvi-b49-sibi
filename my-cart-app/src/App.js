// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CartPage from './CartPage';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Switch>
          <Route path="/cart" component={CartPage} />
          {/* Add more routes for other pages if needed */}
        </Switch>
      </Router>
    </CartProvider>
  );
}

export default App;

