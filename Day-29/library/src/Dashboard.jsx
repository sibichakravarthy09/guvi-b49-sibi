// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import TakeBook from './TakeBook';

import backgroundImage from './assets/library_1.jpg'; // Adjust the path accordingly

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh', // Ensure the background covers the entire viewport
  // Add any additional styling as needed
};

function Dashboard() {
  return (
    <div style={backgroundStyle}>
      <nav>
        <ul>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/add-author">Add Author</Link></li>
        </ul>
      </nav>
      <BookCollection />
    </div>
  );
}

export default Dashboard;
