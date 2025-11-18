import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SlidingCarHorizontal = ({ imageSrc = "/BajaSide.png", alt = "Baja Car" }) => {
  const ref = useRef(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isMobile
      ? ["start 1.1", "end 0.85"]   // 📱 телефонам — быстрее
      : ["start 2.5", "end 1.1"],   // 💻 компьютерам — как раньше
    layoutEffect: false,
  });


  // Car motion
  const x = useTransform(scrollYProgress, [0, 1], ["-130vw", "130vw"]);
  const carOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 1, 1, 0]);

  // Mask motion behind car
  const maskX = useTransform(scrollYProgress, [0, 1], ["-120vw", "40vw"]);

  return (
    <section
      ref={ref}
      className="sliding-car-section relative w-full h-[320vh] bg-black overflow-hidden"
    >

      {/* --- MASK WITHOUT BLUR (NO LAG) --- */}
      <motion.div
        style={{
          x: maskX,
          position: "fixed",
          top: 0,
          left: 0,
          width: "120vw",
          height: "120vh",
          zIndex: 40,
          pointerEvents: "none",
          background: "black",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      />

      {/* --- CAR --- */}
      <motion.div
        style={{
          x,
          opacity: carOpacity,
          scale: 1.2,
        }}
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          z-50 pointer-events-none
          sm:scale-[1.35]
          md:scale-[1.25]
          lg:scale-[1.15]
          xl:scale-[1.1]
        "
      >
        <img
          src={imageSrc}
          alt={alt}
          draggable={false}
          className="
            w-[85vw]
            sm:w-[70vw]
            md:w-[55vw]
            lg:w-[45vw]
            xl:w-[35vw]
          "
          style={{
            maxWidth: "none",
            transformOrigin: "center center",
          }}
        />
      </motion.div>
    </section>
  );
};

export default SlidingCarHorizontal;
