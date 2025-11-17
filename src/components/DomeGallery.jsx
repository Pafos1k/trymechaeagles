import { useRef, useMemo, useCallback, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import "./DomeGallery.css";

const IMAGES = [
  "/team/Vedarsh Mishra.jpg",
  "/team/Austin Kinnealey.jpg",
  "/team/Lucas DiMarco.jpg",
  "/team/Ambrose McCullough.jpg",
  "/team/Samuel Kaiser.jpg",

  // === Science ===
  "/team/Vlad1.jpg",
  "/team/Armand Koochekzadeh.jpg",
  "/team/Jack Dauphinais.jpg",
  "/team/Si Hyun Lee.jpg",
  "/team/Vincent Zemrani.jpg",
  "/team/Christian Roth.jpg",
  "/team/Matthew Hark.jpg",
  "/team/Deven Creeth.jpg",
  "/team/Atharva Naik.jpg",
  "/team/Marguerite (Meg) Fabian.jpg",

  // === Programmatics ===
  "/team/Maxwell Crawford.jpg",
  "/team/Juan (Carlos) Contreras.jpg",
  "/team/Jack Tommaney.jpg",
  "/team/Matt Mahan.jpg",
  "/team/Thomas Ogrodnik.jpg",
  "/team/Jonathan Jiao.jpg",
  "/team/Alex Lee.jpg",
  "/team/Marcos Garay.jpg",
  "/team/Brett McDowell.jpg",
  "/team/benson .jpg",
  "/team/Emmanuel Bamgbala.jpg",

  // === Engineering ===
  "/team/Troy Sterling.jpg",
  "/team/Taein Kang.jpg",
  "/team/Matthew Bristing.jpg",
  "/team/Tobin Ting.jpg",
  "/team/Dat Ho.jpg",
  "/team/Devin Dear.jpg",
  "/team/Colin Noble.jpg",
  "/team/Max Pohl.jpg",
  "/team/Jack DelGrande.jpg",
  "/team/Kyle Phillips.jpg",
  "/team/Effie Hatzopoulos.jpg",
  "/team/Hunter Valentine.jpg",
  "/team/Paulino Gin.jpg",
  "/team/Asad Faquirzada.jpg",
  "/team/Jack Brogan.jpg",
  "/team/Lucas Jeff.jpg",
  "/team/Michael Kester.jpg",
  "/team/Rudolph DeMeo.jpg",
  "/team/Daniel Martin.jpg",
];

export default function DomeGallery() {
  const sphereRef = useRef(null);
  const rotation = useRef({ x: 0, y: 0 });

  const idleTimer = useRef(null);
  const shouldAutoRotate = useRef(false);
  const autoRotateFrame = useRef(null);

  const radius = 500;
  const numImages = 80;

  // ► Fibonacci распределение по сфере
  const images = useMemo(() => {
    const list = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numImages; i++) {
      const y = 1 - (i / (numImages - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const phi = Math.asin(y);
      const thetaDeg = (Math.atan2(z, x) * 180) / Math.PI;
      const phiDeg = (phi * 180) / Math.PI;

      list.push({
        src: IMAGES[i % IMAGES.length],
        rotateY: thetaDeg,
        rotateX: -phiDeg,
      });
    }
    return list;
  }, []);

  // ► Apply rotation
  const applyRotation = useCallback(() => {
    if (!sphereRef.current) return;
    rotation.current.x = Math.max(-70, Math.min(70, rotation.current.x));
    sphereRef.current.style.transform = 
      `scale(0.65) rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
  }, []);

  // ► Auto-rotate loop (med slow)
  const autoRotateLoop = useCallback(() => {
    if (!shouldAutoRotate.current) return;

    rotation.current.y += 0.05;
    applyRotation();

    // 33ms = "30 FPS", снижает лаги
    autoRotateFrame.current = setTimeout(() => {
      requestAnimationFrame(autoRotateLoop);
    }, 33);
  }, [applyRotation]);

  // ► Запуск таймера бездействия (3 сек)
  const restartIdleTimer = useCallback(() => {
    shouldAutoRotate.current = false;

    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      shouldAutoRotate.current = true;
      autoRotateLoop();
    }, 2000);
  }, [autoRotateLoop]);

  // ► Drag
  useGesture(
    {
      onDrag: ({ delta: [dx, dy] }) => {
        rotation.current.x -= dy * 0.5;
        rotation.current.y += dx * 0.5;
        applyRotation();
        restartIdleTimer();
      },
    },
    { target: sphereRef, eventOptions: { passive: true } }
  );

  // ► Start
  useEffect(() => {
    applyRotation();
    restartIdleTimer();
    return () => {
      clearTimeout(idleTimer.current);
      clearTimeout(autoRotateFrame.current);
    };
  }, [applyRotation, restartIdleTimer]);

  return (
    <div className="dome-container">
      <div ref={sphereRef} className="sphere">
        {images.map((img, i) => (
          <div
            key={i}
            className="tile"
            style={{
              transform: `
                rotateY(${img.rotateY}deg)
                rotateX(${img.rotateX}deg)
                translateZ(${radius}px)
              `,
            }}
          >
            <img src={img.src} alt="" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
