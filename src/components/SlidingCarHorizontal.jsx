import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SlidingCarHorizontal = ({ imageSrc = "/BajaSide.png", alt = "Baja Car" }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 2.2", "end 0.9"],
    layoutEffect: false,
  });

  // Car motion (left → right)
  const x = useTransform(scrollYProgress, [0, 1], ["-130vw", "130vw"]);
  const carOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 1, 1, 0]);

  // Mask trails behind car
  const maskX = useTransform(scrollYProgress, [0, 1], ["-180vw", "80vw"]);

  return (
    <section
      ref={ref}
      className="sliding-car-section relative w-full h-[320vh] bg-black overflow-hidden"
    >
      {/* --- BLACK TRAILING MASK --- */}
      <motion.div
        data-mask="sliding-mask"
        style={{
          x: maskX,
          position: "fixed",
          top: 0,
          left: 0,
          width: "115vw",
          height: "120vh",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `
              linear-gradient(
                90deg,
                rgba(0,0,0,1) 0%,
                rgba(0,0,0,1) 70%,
                rgba(0,0,0,0.95) 85%,
                rgba(0,0,0,0) 100%
              )
            `,
            filter: "blur(15px)",
            opacity: 1,
          }}
        />
      </motion.div>

      {/* --- CAR --- */}
      <motion.div
        style={{
          x,
          opacity: carOpacity,
          scale: 1.2, // default
        }}
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          z-50 pointer-events-none

          /* --- RESPONSIVE CAR SCALING --- */
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
            /* --- RESPONSIVE WIDTHS --- */
            w-[85vw]     /* mobile: biggest */
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
