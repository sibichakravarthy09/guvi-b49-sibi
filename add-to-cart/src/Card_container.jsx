import React from "react";
import Card from "./Card";
import Img1 from "./Images/flowral_1.jpg";
import Img2 from "./Images/green_1.jpg";
import Img3 from "./Images/hero_1.jpg";
import Img4 from "./Images/pink_1.jpg";
import Img5 from "./Images/white_1.jpg";
import Img6 from "./Images/jean_1.jpg";
import Img7 from "./Images/pattern.jpg";
import Img8 from "./Images/free_1.jpg";


function Card_contaier({cart,setCart}) {

  const product_details = [
    {
      img: Img1,
      sale: true,
      productName: "Floral shirt",
      rating: 5,
      price1: " ₹400",
      price2: " ₹310",
    },
    {
      img: Img2,
      sale: true,
      productName: "Greem shirt",
      rating: 3,
      price1: " ₹350",
      price2: " ₹200",
    },
    {
      img: Img3,
      sale: false,
      productName: "Classic shirt",
      rating: 5,
      price1: " ₹320",
      price2: " ₹220",
    },
    {
      img: Img4,
      sale: false,
      productName: "Light shade shirt",
      rating: 4,
      price1: " ₹430",
      price2: " ₹300"
    },
    {
      img: Img5,
      sale: false,
      productName: "Casual shirt",
      rating: 3,
      price1: " ₹270",
      price2: " ₹230"
    },
    {
      img: Img6,
      sale: false,
      productName: "Jeans",
      rating: 4,
      price1: " ₹490",
      price2: " ₹370"
    },
    {
      img: Img7,
      sale: true,
      productName: "Simple pattern shirt",
      rating: 5,
      price1: " ₹150",
      price2: " ₹100"
    },
    {
      img: Img8,
      sale: false,
      productName: "black shirt",
      rating: 2,
      price1: " ₹220",
      price2: " ₹160"
    },
  ];
  return (
    <div>
        <div class="container px-4 px-lg-5 mt-5">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {product_details.map((data, index) => (
              <Card setCart={setCart} cart={cart} data={product_details[index]} />
            ))} 
          </div>
        </div>
    </div>
  );
}

export default Card_contaier;