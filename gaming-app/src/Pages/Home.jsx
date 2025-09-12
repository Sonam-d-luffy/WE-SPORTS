import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import UserPage from './UserPage';
import assets from '../assets/assets';

const Home = () => {
    const [bgImage, setBgImage] = useState(assets.l8) // default desktop

useEffect(() => {
  const updateBackground = () => {
    if (window.innerWidth < 640) {
      setBgImage(assets.m3) // 👈 small screens (mobile)
    } else if (window.innerWidth < 1024) {
      setBgImage(assets.l8) // 👈 medium screens (tablet)
    } else {
      setBgImage(assets.l5) // 👈 large screens (desktop)
    }
  }

  updateBackground()
  window.addEventListener("resize", updateBackground)
  return () => window.removeEventListener("resize", updateBackground)
}, [])
  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Navbar appears on top */}
      <Navbar />

      {/* Main content */}
      <UserPage />

      {/* Optional overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
    </div>
  );
};

export default Home;
