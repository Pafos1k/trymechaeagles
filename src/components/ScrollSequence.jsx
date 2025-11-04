import React, { useEffect, useState } from "react";
import "./ScrollSequence.css";

const ScrollSequence = () => {
  const [heroProgress, setHeroProgress] = useState(0);
  const [carProgress, setCarProgress] = useState(0);
  const [maskCoversCenter, setMaskCoversCenter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // --- HERO PROGRESS ---
      const heroSection = document.querySelector(".scroll-sequence-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const windowH = window.innerHeight;
        const scrollRange = Math.max(rect.height - windowH, 1);
        const p = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
        setHeroProgress(p);
      }

      // --- CAR PROGRESS ---
      const carSection = document.querySelector(".sliding-car-section");
      if (carSection) {
        const rectC = carSection.getBoundingClientRect();
        const windowH = window.innerHeight;
        const carRange = Math.max(rectC.height - windowH, 1);
        const cp = Math.min(Math.max(-rectC.top / carRange, 0), 1);
        setCarProgress(cp);
      }

      // --- CHECK MASK COVERAGE (real-time hide like MIT site) ---
      const maskEl = document.querySelector('[data-mask="sliding-mask"]');
      if (maskEl) {
        const maskRect = maskEl.getBoundingClientRect();
        const midX = window.innerWidth / 2; // center of screen
        const covers = maskRect.left <= midX && maskRect.right >= midX;
        setMaskCoversCenter(covers);
      } else {
        setMaskCoversCenter(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 3-step fade-in like before ---
  const introOpacity = Math.min(heroProgress * 2, 1); // "Introducing"
  const modelOpacity =
    heroProgress > 0.3 ? Math.min((heroProgress - 0.3) * 2, 1) : 0; // "Model Year"
  const numberOpacity =
    heroProgress > 0.6 ? Math.min((heroProgress - 0.6) * 2, 1) : 0; // "26"

  // --- Car-triggered fade-out (slightly early) ---
  const fadeOut =
    carProgress < 0.02
      ? 1
      : carProgress > 0.18
      ? 0
      : 1 - (carProgress - 0.02) / (0.18 - 0.02);

  // --- If mask overlaps center, hide instantly (like MIT) ---
  const finalOpacity = maskCoversCenter ? 0 : fadeOut;

  return (
    <section className="scroll-sequence-section">
      {/* --- TEXT LAYER --- */}
      <div
        className="scroll-content-fixed"
        style={{
          opacity: finalOpacity,
          transition: "opacity 0.2s linear",
          zIndex: 20,
        }}
      >
        {/* BACKGROUND NUMBER */}
        <div className="scroll-number-bg" style={{ opacity: numberOpacity }}>
          26
        </div>

        {/* TITLE + SUBTITLE */}
        <div className="scroll-text-overlay">
          <h1 className="scroll-title" style={{ opacity: introOpacity }}>
            Introducing
          </h1>
          <h2 className="scroll-subtitle" style={{ opacity: modelOpacity }}>
            Model Year
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ScrollSequence;
