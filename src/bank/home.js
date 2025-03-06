import React from 'react';
import './home1.css';
import bankVideo from '../asset/bg2.mp4'; 

function Home() {
  return (
    <div className="home-container">
      <video autoPlay loop unmuted className="bg-video">
        <source src={bankVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
    <h1>Black's Bank</h1>
    <p>Where Financial Trust Meets Unwavering Stability</p>
</div>
    </div>
  );
}

export default Home;