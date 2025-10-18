import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "motion/react";
import "./RollingGallery.css";

const IMGS = [
  "baja-side.png",
  "CarRender13.JPG",
  "CarRender1.JPG",
  "baja-side.png",
  "CarRender1.JPG",
  "baja-side.png",
  "CarRender14.JPG",
];

const RollingGallery = ({ autoplay = true, pauseOnHover = true }) => {
  const faceCount = IMGS.length;
  const faceWidth = 380;
  const cylinderWidth = 2400;
  const dragFactor = 0.1;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const transform = useTransform(rotation, (v) => `rotateY(${v}deg)`);

  // --- AUTOPLAY ROTATION ---
  useEffect(() => {
    if (!autoplay) return;
    const rotate = () => {
      const next = rotation.get() - 360 / faceCount;
      controls.start({
        rotateY: next,
        transition: { duration: 2.5, ease: "easeInOut" },
      });
      rotation.set(next);
    };
    autoplayRef.current = setInterval(rotate, 3000);
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, faceCount, rotation, controls]);

  // --- DRAG ROTATION ---
  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };
  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 80, damping: 25 },
    });
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover && autoplayRef.current) {
      clearInterval(autoplayRef.current);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const restart = () => {
        const next = rotation.get() - 360 / faceCount;
        controls.start({
          rotateY: next,
          transition: { duration: 2.5, ease: "easeInOut" },
        });
        rotation.set(next);
      };
      autoplayRef.current = setInterval(restart, 3000);
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left" />
      <div className="gallery-gradient gallery-gradient-right" />

      <div className="gallery-content">
        <motion.div
          className="gallery-track"
          drag="x"
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            transformStyle: "preserve-3d",
            width: cylinderWidth,
          }}
          animate={controls}
        >
          {IMGS.map((url, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
            >
              <img src={url} alt={`Gallery ${i + 1}`} className="gallery-img" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
