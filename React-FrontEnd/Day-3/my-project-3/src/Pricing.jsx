import React, { Component } from 'react'

export class Pricing extends Component {
  render() {
    return (
      <div>
         <div className="wrapper">
       <div className="table basic">
           <div className="price-section">
               <div className="price-area">
                   <div className="inner-area">
                       <span className="text">
                         &#8377;
                       </span>
                       <span className="price">1k</span>
                   </div>
               </div>
           </div>
           <div className="package-name">
    
           </div>
           <div className="features">
               <li>
                   <span className="list-name">Fitness Assessment</span>
                   <span className="icon check"><i className="fas fa-check-circle"></i></span>
               </li>
               <li>
                   <span className="list-name">Hardcore Fitness Trainig</span>
                   <span className="icon check"><i className="fas fa-check-circle"></i></span>
               </li>
               <li>
                   <span className="list-name">Nutrition Consultations</span>
                   <span className="icon cross"><i className="far fa-times-circle"></i></span>
               </li>
               <li>
                   <span className="list-name">Premium Gym Bag</span>
                   <span className="icon cross"><i className="far fa-times-circle"></i></span>
               </li>
               <div className="btn"><button>Purchase</button></div>
           </div>
       </div>
       <div className="table Premium">
           <div className="price-section">
               <div className="price-area">
                   <div className="inner-area">
                       <span className="text">
                         &#8377;
                       </span>
                       <span className="price">3k</span>
                   </div>
               </div>
           </div>
           <div className="package-name">
            
           </div>
           <div className="features">
               <li>
                   <span className="list-name">Fitness Assessment </span>
                   <span className="icon check"><i className="fas fa-check-circle"></i></span>
               </li>
               <li>
                   <span className="list-name">Hardcore Fitness Trainig</span>
                   <span className="icon check"><i className="fas fa-check-circle"></i></span>
               </li>
               <li>
                   <span className="list-name">Nutrition Consultations</span>
                   <span className="icon check"><i className="fas fa-check-circle"></i></span>
               </li>
               <li>
                   <span className="list-name">Premium Gym Bag</span>
                   <span className="icon cross"><i className="far fa-times-circle"></i></span>
               </li>
               <div className="btn"><button>Purchase</button></div>
           </div>
       </div>
       <div className="table Ultimate">
           <div className="price-section">
               <div className="price-area">
                   <div className="inner-area">
                       <span className="text">
                          &#8377;
                       </span>
                       <span className="price">5k</span>
                   </div>
               </div>
           </div>
           <div className="package-name">
               
           </div>
           <div className="features">
               <li>
                   <span className="list-name">Fitness Assessment</span>
                   <span className="icon check"><i className="fas fa-check-circle"></i></span>
               </li>
               <li>
                   <span className="list-name">Hardcore Fitness Trainig</span>
                   <span className="icon check"><i className="fas fa-check-circle"></i></span>
               </li>
               <li>
                   <span className="list-name">Nutrition Consultations</span>
                   <span className="icon check"><i class="fas fa-check-circle"></i></span>
               </li>
               <li>
                   <span className="list-name">Premium Gym Bag & T-shirt</span>
                   <span className="icon check"><i className="fas fa-check-circle"></i></span>
               </li>
               <div className="btn"><button>Purchase</button></div>
           </div>
       </div>
   </div>
      </div>
    )
  }
}

export default Pricing