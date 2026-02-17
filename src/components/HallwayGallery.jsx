import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HallwayGallery() {
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const centerViewportRef = useRef(null);
  const centerInnerRef = useRef(null);

  const items = useMemo(
    () => [
      { id: "L1", side: "left", src: "/GROUP1.png" },
      { id: "R1", side: "right", src: "/GROUP2.png" },
      { id: "L2", side: "left", src: "/GROUP3.png" },
      { id: "R2", side: "right", src: "/GROUP4.png" },
      { id: "L3", side: "left", src: "/GROUP5.png" },
      { id: "R3", side: "right", src: "/BCEngeeniring.png" },
      { id: "L4", side: "left", src: "/GROUP1.png" },
      { id: "R4", side: "right", src: "/GROUP2.png" },
      { id: "L5", side: "left", src: "/GROUP3.png" },
      { id: "R5", side: "right", src: "/GROUP4.png" },
      { id: "L6", side: "left", src: "/GROUP1.png" },
      { id: "R6", side: "right", src: "/GROUP2.png" },

      // Placeholder images

    ],
    []
  );

  useEffect(() => {
    const stageEl = stageRef.current;
    const trackEl = trackRef.current;
    const centerViewportEl = centerViewportRef.current;
    const centerInnerEl = centerInnerRef.current;
    if (!stageEl || !trackEl || !centerViewportEl || !centerInnerEl) return;

    const frames = Array.from(trackEl.querySelectorAll("[data-frame]"));
    if (!frames.length) return;

   
    const spacingZ = 400;     // smaller = more dense
    const startZ = -8500;
    const endZ = 1400;
    const WARMUP_Z = Math.max(1200, 5200 - frames.length);
 

    const wallX = 520;
    const wallRotateY = 70;

    const IMAGE_SPEED_MULT = 0.39; // Image scroll speed
    const travel = (endZ - startZ) * IMAGE_SPEED_MULT;

    // End pin exactly when last frame is gone
    const zLast0 = startZ + (frames.length - 1) * spacingZ + WARMUP_Z;
    const Z_GONE = 1600;
    //const progressToGone = Math.max(0, Math.min(1, (Z_GONE - zLast0) / travel));
    //const END_PX = Math.max(900, (frames.length * 2400) * progressToGone);


    gsap.set(trackEl, { transformStyle: "preserve-3d" });
    gsap.set(frames, { willChange: "transform" });

    frames.forEach((el, i) => {
      const side = el.getAttribute("data-side");
      const isLeft = side === "left";
      gsap.set(el, {
        x: isLeft ? -wallX : wallX,
        y: 0,
        z: startZ + i * spacingZ + WARMUP_Z,
        rotationY: isLeft ? wallRotateY : -wallRotateY,
        opacity: 1,
      });
    });

    // Center scroll amount (how much the inner content needs to move)
const centerScrollAmount = Math.max(
  0,
  centerInnerEl.scrollHeight - centerViewportEl.clientHeight
);

// ✅ Pin should end when center finishes (no deadzone)
const END_PX = Math.max(900, centerScrollAmount + 450); 
// tweak +450 (buffer) to taste: 250–700


    const tl = gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: {
    trigger: stageEl,
    start: "top top",
    end: `+=${END_PX}`,   // ✅ pin ends when text ends
    scrub: true,
    pin: true,
    pinSpacing: true,
    invalidateOnRefresh: true,
  },
});


    frames.forEach((el) => {
      tl.to(el, { z: `+=${travel}` }, 0);
    });

    const centerST = gsap.to(centerInnerEl, {
  y: -centerScrollAmount,
  ease: "none",
  scrollTrigger: {
    trigger: stageEl,
    start: "top top",
    end: `+=${END_PX}`,   // ✅ same end
    scrub: 0,
    invalidateOnRefresh: true,
  },
});


    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    // Make sure layout is correct right away
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      centerST.scrollTrigger?.kill();
      centerST.kill();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [items]);

  //////////////////////////            CHANGE PLACEHOLDER PARAGRAPHS HERE
  return (
    <section className="hallway-section" ref={stageRef}>
      <div style={styles.camera}>
        <div ref={trackRef} style={styles.track}>
          {items.map((item) => (
            <figure
              data-frame
              data-side={item.side}
              style={styles.frame}
            >
              <img src={item.src} alt="" style={styles.img} draggable={false} />
            </figure>
          ))}
        </div>

        <div ref={centerViewportRef} style={styles.centerViewport}>
          <div ref={centerInnerRef} style={styles.centerInner}>
            <h2 style={{ marginTop: 0 }}>mecha eagles hella cool</h2> 
            <p style={styles.p}>Mecha Eagles</p>
            <p style={styles.p}>
            MechaEagles is a collegiate BAJA SAE racing and engineering team founded by
            Boston College students. Our mission is to fuel the creative interests of
            students through constructing and racing high-performance vehicles while
            fostering collaboration, curiosity, and technical excellence. We believe in
            building engineers through hands-on experience, mentorship, and bold
            ambition — turning ideas into machines that compete, evolve, and inspire.

            More stuff blah blah longer hi hello placeholderrr. mechaeagles is soosocool
            More stuff blah blah longer hi hello placeholderrr. mechaeagles is soosocool
            More stuff blah blah longer hi hello placeholderrr. mechaeagles is soosocool
            More stuff blah blah longer hi hello placeholderrr. mechaeagles is soosocool
         
            </p>

          </div>
        </div>

        <div style={styles.vignette} />
      </div>
    </section>
  );
}

const styles = {
  camera: {
    position: "relative",
    width: "min(1400px, 96vw)", 
    height: "min(760px, 82vh)",
    borderRadius: 28,
    overflow: "hidden",
    background:
      "radial-gradient(1200px 700px at 50% 50%, #0f1320 0%, #07080b 60%, #05060a 100%)",
    perspective: "1200px",
    boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
    margin: "0 auto",
  },

  track: { position: "absolute", inset: 0, transformStyle: "preserve-3d" },

  frame: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 340,
    height: 460,
    transform: "translate(-50%, -50%)",
    borderRadius: 18,
    overflow: "hidden",
    background: "transparent",
  },

  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },

  centerViewport: {
  position: "absolute",
  left: "50%",
  top: "50%",
  width: "min(420px, 40vw)", 
  height: "67%",      //haha 67     
  transform: "translate(-50%, -50%)",
  overflow: "hidden",
  borderRadius: 18,
  background: "rgba(0,0,0,0.35)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: 22,
  zIndex: 5,
},


  centerInner: { position: "relative" },
  p: { opacity: 0.82, lineHeight: 1.65, marginTop: 14 },

  vignette: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "radial-gradient(800px 500px at 50% 45%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.75) 100%)",
  },
};
