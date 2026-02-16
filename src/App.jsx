import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import LightRays from './LightRays';
import ShinyText from './components/ShinyText';
import MoonRover3D from './components/MoonRover3d';
import LogoLoop from './components/LogoLoop';
import SlidingCarHorizontal from './components/SlidingCarHorizontal';
import ScrollSequence from './components/ScrollSequence';
import Header from "./components/Header";
import Footer from "./components/Footer";
import RollingGallery from './components/RollingGallery';

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="w-full min-h-screen relative bg-black">
      {/* --- HEADER (outside everything else) --- */}
      <Header />

      {/* --- FIRST SECTION (Hero) --- */}
      <section className="w-full relative flex flex-col justify-start items-center overflow-visible pt-32">
        {/* --- BACKGROUND EFFECT --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="white"
            raysSpeed={0.9}
            lightSpread={0.9}
            rayLength={2.8}
            saturation={0.8}
            fadeDistance={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        {/* --- NEW FLEX WRAPPER --- */}
        <div className="hero-flex-container relative z-50">
          
          {/* --- TEXT CONTENT --- */}
          <main className="flex-1 relative z-40">
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
                className="description text"
              />

              <div className="buttons">
                <a href="https://docs.google.com" className="btn-get-started">
                  JOIN US
                </a>
              </div>
            </div>
          </main>

          {/* --- GALLERY (Now a sibling) --- */}
          <div className="flex-1 flex justify-center items-center">
            <RollingGallery />
          </div>

        </div>
      </section>

      {/* --- SPONSORS SECTION WITH LOGO LOOP --- */}
      <section className="sponsors-section">
        <div className="sponsors-section__container">
          <div className="sponsors-section__spacer"></div>
          <p className="sponsors-section__label">Powering Mechaeagles</p>
          <LogoLoop
            logos={[
              { src: "/SAE.png", href: "#" },
              { src: "/FUSION.png", href: "#" },
              { src: "/NASA.png", href: "#" },
              { src: "/IGOS.png", href: "#" },
              { src: "/BCEngeeniring.png", href: "#" },
              { src: "/SOLIDWORK.png", href: "#" },
            ]}
            speed={75}
            direction="left"
            logoHeight={140}
            gap={28}
            pauseOnHover={false}
            scaleOnHover={false}
            ariaLabel="Our sponsors"
          />
        </div>
      </section>

      <ScrollSequence />

      <SlidingCarHorizontal imageSrc="/BajaSide.png" alt="Baja Car" />
      
      <section className="specs-section">
        <div className="spec-item">
          <img src="/BajaFront.png" alt="front" className="spec-image" />
          <h2 className="spec-title">ACCELERATION</h2>
          <ShinyText 
            text="0-30 mph in 2s" 
            disabled={false}
            speed={2}
            className="spec-text"
          />
        </div>

        <div className="spec-item">
          <img src="/BajaSide.png" alt="side" className="spec-image" />
          <h2 className="spec-title">TOP SPEED</h2>
          <ShinyText 
            text="50 mph" 
            disabled={false}
            speed={2}
            className="spec-text"
          />
        </div>

        <div className="spec-item">
          <img src="/BajaBack.png" alt="rear" className="spec-image" />
          <h2 className="spec-title">WEIGHT</h2>
          <ShinyText 
            text="197 kg" 
            disabled={false}
            speed={2}
            className="spec-text"
          />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default App;
