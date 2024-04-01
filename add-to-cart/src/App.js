import './App.css';
import Nav from './Nav';
import Header from './Header';
import Card_contaier from './Card_container';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  

const [cart,setCart] = useState(0);

  return (
    <div className="App">
      <Nav cart={cart} setCart={setCart}/>
      <Header />
      <Card_contaier cart={cart} setCart={setCart} />
      <Footer />
    </div>
  );
}

export default App;