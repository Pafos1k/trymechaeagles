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
  "/team/Vlad.jpg",
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
  "/team/featured4.jpg",
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

  "/team/Vlad.jpg",
  "/team/Armand Koochekzadeh.jpg",
  "/team/Jack Dauphinais.jpg",
  "/team/Si Hyun Lee.jpg",
  "/team/Vincent Zemrani.jpg",
  "/team/Christian Roth.jpg",
  "/team/Matthew Hark.jpg",
  "/team/Deven Creeth.jpg",
  "/team/Atharva Naik.jpg",
  "/team/Marguerite (Meg) Fabian.jpg",

  "/team/Vlad.jpg",
  "/team/Armand Koochekzadeh.jpg",
  "/team/Jack Dauphinais.jpg",
  "/team/science1.jpg",
  "/team/Si Hyun Lee.jpg",
  "/team/Vincent Zemrani.jpg",
  "/team/Christian Roth.jpg",
  "/team/Matthew Hark.jpg",
  "/team/Deven Creeth.jpg",
  "/team/Atharva Naik.jpg",
  "/team/Marguerite (Meg) Fabian.jpg",

];

export default function DomeGallery() {
  const sphereRef = useRef(null);
  const rotation = useRef({ x: 0, y: 0 });
  const inertia = useRef(null);

  const radius = 500;
  const numImages = 80; //NUMBER OFF IMAGES TO DISPLAY

  // --- Распределение картинок по сфере (Fibonacci Sphere) ---
  const images = useMemo(() => {
    const list = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5°

    for (let i = 0; i < numImages; i++) {
      const y = 1 - (i / (numImages - 1)) * 2; // от 1 до -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const phi = Math.asin(y);
      const thetaDeg = (Math.atan2(z, x) * 180) / Math.PI;
      const phiDeg = (phi * 180) / Math.PI;

      const index = i % IMAGES.length;
      list.push({
        src: IMAGES[index],
        rotateY: thetaDeg,
        rotateX: -phiDeg,
      });
    }
    return list;
  }, []);

  // --- Применяем вращение ---
  const applyRotation = useCallback(() => {
    if (sphereRef.current) {
      rotation.current.x = Math.max(-70, Math.min(70, rotation.current.x));
      sphereRef.current.style.transform = `scale(0.65) rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
    }
  }, []);

  // --- Инерция после drag ---
  const startInertia = useCallback(
    (vx, vy) => {
      let vX = vx * 15;
      let vY = vy * 15;
      const decay = 0.92;
      const step = () => {
        vX *= decay;
        vY *= decay;
        if (Math.abs(vX) < 0.01 && Math.abs(vY) < 0.01) return;
        rotation.current.x -= vY * 0.5;
        rotation.current.y += vX * 0.5;
        applyRotation();
        inertia.current = requestAnimationFrame(step);
      };
      cancelAnimationFrame(inertia.current);
      inertia.current = requestAnimationFrame(step);
    },
    [applyRotation]
  );

  // --- Drag управление ---
  useGesture(
    {
      onDrag: ({ delta: [dx, dy], last, velocity: [vx, vy] }) => {
        rotation.current.x -= dy * 0.5;
        rotation.current.y += dx * 0.5;
        applyRotation();
        if (last) startInertia(vx, vy);
      },
    },
    { target: sphereRef, eventOptions: { passive: true } }
  );

  // --- Стартовая установка и автоматическое вращение ---
  useEffect(() => {
    applyRotation();

    // 🔄 Автоматическое медленное вращение
    let frame;
    const autoRotate = () => {
      rotation.current.y += 0.05; // скорость (0.05–0.3)
      applyRotation();
      frame = requestAnimationFrame(autoRotate);
    };

    frame = requestAnimationFrame(autoRotate);
    return () => cancelAnimationFrame(frame);
  }, [applyRotation]);

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
