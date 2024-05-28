import React from 'react';

function Header() {
  return (
    <header className="bg-dark mb-5 py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bolder"></h1>
          <img src="/image/shop_1.jpg" alt="banner" className="text-center" style={{ width: "550px" }} />
        </div>
      </div>
    </header>
  );
}

export default Header;