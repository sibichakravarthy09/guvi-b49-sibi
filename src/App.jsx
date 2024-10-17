import React, { useState } from "react";
import CardGrid from "./Component/Card";
import Header from "./Component/Header";
import Navbar from "./Component/Navbar";
import ("bootstrap")
import Footer from "./Component/Footer";

function App() {
  const [cartValue, setCartValue] = useState(0);

  return (
    <>
      <Navbar cartValue={cartValue} />
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <CardGrid setCartValue={setCartValue}></CardGrid>
          </div>
        </div>
      <Footer/>
      </section>
    </>
  );
}

export default App;