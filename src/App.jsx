import React from "react";
import Navbar from "./components/navigation/Navbar";
import HeroSection from "./components/hero/HeroSection";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">

      {/* Global starfield */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/starfield.jpg')",
          opacity: 0.18,
        }}
      />

      {/* Dark overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/55" />

      {/* Entire UI */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
      </div>

    </div>
  );
}

export default App;