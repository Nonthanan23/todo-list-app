import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
      <div className="container d-flex justify-content-center align-items-center flex-column">
      <h1 className='text-center'>Organize your<br />Daily life
        </h1>
        <p>Make your daily life easy with our todo app</p>
        <button className='home-btn p-2'>Get Started</button>
      </div>
    </div>
  );
};

export default Home