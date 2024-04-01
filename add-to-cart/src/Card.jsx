import React from "react";
import { useState } from "react";

function Card({ data, cart, setCart}) {
  const [btnClick, setBtnclick] = useState(true);

  return (
    <div>
      <div class="col mb-5">
        <div class="card h-100">
          {data.sale ? (
            <div
              class="badge bg-dark text-white position-absolute"
              style={{ top: "0.5rem", right: "0.5rem" }}
            >
              Sale
            </div>
          ) : null}
          <img class="card-img-top" src={data.img} alt="..." />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">{data.productName}</h5>

              <div class="d-flex justify-content-center small text-warning mb-2">
                {[...Array(Math.min(data.rating, 5))].map((_, index) => (
                  <div className="bi-star-fill"></div>
                ))}
              </div>

              <span 
                class="text-muted text-decoration-line-through"
                style={{ marginRight: "5px", fontWeight:'300' }}
              >
                {data.price1} 
              </span><span style={{ marginRight: "5px",fontSize:'20px',fontWeight:'400' }}>
             - {data.price2}
             </span>
            </div>
          </div>

          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              {btnClick ? (
                <a
                  class="btn btn-outline-light bg-success mt-auto"
                  onClick={() => {
                    setBtnclick(false);
                    setCart(cart + 1);
                  }}
                >
                  Add to cart
                </a>
              ) : (
                <a
                  class="btn btn-outline-light bg-danger mt-auto"
                  onClick={() => {
                    setBtnclick(true);
                    setCart(cart - 1);
                  }}
                >
                  Remove from cart
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;