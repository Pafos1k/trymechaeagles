import React from 'react';
import LightRays from './LightRays';
import ShinyText from './components/ShinyText';
import RollingGallery from './components/RollingGallery';


const App = () => {
  return (
    <div className="w-full h-screen relative bg-black flex justify-center items-center overflow-hidden">
      {/* --- BACKGROUND EFFECT --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="white"
          raysSpeed={0.9}
          lightSpread={0.9}
          rayLength={2.8}
          colorsaturation={0.8}
          fadeDistance={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* --- GALLERY (positioned absolutely) --- */}
      <RollingGallery />

      {/* --- MAIN CONTAINER --- */}
      <div className="container relative z-50">
        <header className="flex justify-between items-center w-full py-6 px-0 relative z-50">
          <img src="/eagle.png" alt="Logo" width="135" className="logo" />

          <nav className="flex space-x-6 relative z-[60]">
            <a href="#" className="text-white hover:text-yellow-400 transition">HOME</a>
            <a href="#" className="text-white hover:text-yellow-400 transition">ABOUT</a>
            <a href="#" className="text-white hover:text-yellow-400 transition">PROJECTS</a>
            <a href="#" className="text-white hover:text-yellow-400 transition">TEAM</a>
          </nav>

          <div className="tag-box contact-tag-box relative z-[60]">
            <div className="tag contact-tag">
              <span className="dot"></span> CONTACT US
            </div>
          </div>
        </header>

        <main className="relative z-40">
          <div className="content text-white">
            <div className="tag-box">
              <div className="tag">INTRODUCING</div>
            </div>

            <h1 className="text-5xl font-bold mb-4 leading-tight">
              BOSTON COLLEGE<br />
              FIRST SAE BAJA <br />
              RACING CLUB
            </h1>

            <ShinyText
              text="Follow our journey as we take on this exciting challenge, push our engineering skills, and bring our vision to life."
              disabled={false}
              speed={3}
              className="description text-lg max-w-xl mb-6"
            />

            <div className="buttons">
              <a
                href="#"
                className="btn-get-started bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
              >JOIN US</a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;