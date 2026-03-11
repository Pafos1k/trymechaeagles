import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 3 depth layers per side. ox values step far enough outward that no layer
// ever visually obstructs a closer one. vy shifts the primary up/down on the
// wall; shadow oy is its own independent vertical offset.
const SLOTS = [
  { side: "left",  src: "/GROUP1.png",        vy:   100, shadows: [
    { src: "/NASA.png",          ox: -400, oz: -90,  oy:  -90, sc: 0.95 },
    { src: "/SOLIDWORK.png",     ox: -600, oz: -120, oy:  110, sc: 0.90 },
  ]},
  { side: "right", src: "/FUSION.png",         vy:  400, shadows: [
    { src: "/GROUP4.png",        ox: -400, oz: -90,  oy:   70, sc: 0.95 },
    { src: "/SAE.png",        ox: -600, oz: -120, oy: -100, sc: 0.90 },
  ]},
  { side: "left",  src: "/NASA.png",           vy: -300, shadows: [
    { src: "/GROUP5.png",        ox: -400, oz: -90,  oy:  100, sc: 0.95 },
  ]},
  { side: "right", src: "/GROUP4.png",         vy:  300, shadows: [
    { src: "/BCEngeeniring.png", ox: -400, oz: -90,  oy:  -85, sc: 0.95 },
    { src: "/GROUP2.png",        ox: -600, oz: -120, oy:  105, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP3.png",         vy: 250, shadows: [
    { src: "/SAW\E.png",        ox: -400, oz: -90,  oy: -200, sc: 0.95 },
    { src: "/GROUP5.png",        ox: -600, oz: -120, oy:   200, sc: 0.90 },
  ]},
  { side: "right", src: "/BCEngeeniring.png",  vy: -350, shadows: [
    { src: "/GROUP4.png",        ox: -400, oz: -90,  oy:  110, sc: 0.95 },
  ]},
  { side: "left",  src: "/GROUP1.png",         vy: -200, shadows: [
    { src: "/SAE.png",        ox: -400, oz: -90,  oy:   85, sc: 0.95 },
    { src: "/GROUP3.png",        ox: -600, oz: -120, oy: -115, sc: 0.90 },
  ]},
  { side: "right", src: "/GROUP2.png",         vy:  300, shadows: [
    { src: "/GROUP4.png",        ox: -400, oz: -90,  oy:  -80, sc: 0.95 },
    { src: "/NASA.png",          ox: -600, oz: -120, oy:  105, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP5.png",         vy: -300, shadows: [
    { src: "/NASA.png",          ox: -400, oz: -90,  oy:   95, sc: 0.95 },
  ]},
  { side: "right", src: "/GROUP4.png",         vy:  400, shadows: [
    { src: "/eagle.png",         ox: -400, oz: -90,  oy: -100, sc: 0.95 },
    { src: "/BCEngeeniring.png", ox: -600, oz: -120, oy:  120, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP3.png",         vy:  400, shadows: [
    { src: "/GROUP1.png",        ox: -400, oz: -90,  oy: -110, sc: 0.95 },
    { src: "/SOLIDWORK.png",     ox: -600, oz: -120, oy:   80, sc: 0.90 },
  ]},
  { side: "right", src: "/GROUP2.png",         vy: -250, shadows: [
    { src: "/GROUP3.png",        ox: -400, oz: -90,  oy:   90, sc: 0.95 },
  ]},
  { side: "left",  src: "/GROUP1.png",         vy:  55, shadows: [
    { src: "/SAE.png",        ox: -400, oz: -90,  oy:   90, sc: 0.95 },
    { src: "/GROUP5.png",        ox: -600, oz: -120, oy: -120, sc: 0.90 },
  ]},
  { side: "right", src: "/BCEngeeniring.png",  vy: -300, shadows: [
    { src: "/GROUP4.png",        ox: -400, oz: -90,  oy:  -90, sc: 0.95 },
    { src: "/SAE.png",        ox: -600, oz: -120, oy:  110, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP2.png",         vy:  60, shadows: [
    { src: "/GROUP4.png",        ox: -400, oz: -90,  oy: -100, sc: 0.95 },
    { src: "/NASA.png",          ox: -600, oz: -120, oy:   85, sc: 0.90 },
  ]},
  { side: "right", src: "/GROUP5.png",         vy: -100, shadows: [
    { src: "/GROUP1.png",        ox: -400, oz: -90,  oy:  105, sc: 0.95 },
  ]},
  { side: "left",  src: "/eagle.png",          vy:  200, shadows: [
    { src: "/GROUP3.png",        ox: -400, oz: -90,  oy:  -95, sc: 0.95 },
    { src: "/FUSION.png",        ox: -600, oz: -120, oy:  115, sc: 0.90 },
  ]},
  { side: "right", src: "/GROUP1.png",         vy:  90, shadows: [
    { src: "/SOLIDWORK.png",     ox: -400, oz: -90,  oy:  -80, sc: 0.95 },
    { src: "/GROUP5.png",        ox: -600, oz: -120, oy:  100, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP4.png",         vy: -400, shadows: [
    { src: "/GROUP2.png",        ox: -400, oz: -90,  oy:   90, sc: 0.95 },
  ]},
  { side: "right", src: "/NASA.png",           vy:  300, shadows: [
    { src: "/SAE.png",        ox: -400, oz: -90,  oy: -110, sc: 0.95 },
    { src: "/GROUP1.png",        ox: -600, oz: -120, oy:   80, sc: 0.90 },
  ]},
  { side: "left",  src: "/SOLIDWORK.png",      vy: -250, shadows: [
    { src: "/eagle.png",         ox: -400, oz: -90,  oy:  100, sc: 0.95 },
    { src: "/GROUP4.png",        ox: -600, oz: -120, oy:  -90, sc: 0.90 },
  ]},
  { side: "right", src: "/GROUP3.png",         vy:  190, shadows: [
    { src: "/GROUP5.png",        ox: -400, oz: -90,  oy:  -85, sc: 0.95 },
  ]},
  { side: "left",  src: "/GROUP2.png",         vy: -400, shadows: [
    { src: "/BCEngeeniring.png", ox: -400, oz: -90,  oy:  115, sc: 0.95 },
    { src: "/GROUP1.png",        ox: -600, oz: -120, oy:  -95, sc: 0.90 },
  ]},
  { side: "right", src: "/FUSION.png",         vy:  200, shadows: [
    { src: "/GROUP4.png",        ox: -400, oz: -90,  oy:   75, sc: 0.95 },
    { src: "/NASA.png",          ox: -600, oz: -120, oy: -105, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP5.png",         vy:  400, shadows: [
    { src: "/GROUP3.png",        ox: -400, oz: -90,  oy:  -90, sc: 0.95 },
  ]},
  { side: "right", src: "/GROUP4.png",         vy: -200, shadows: [
    { src: "/GROUP2.png",        ox: -400, oz: -90,  oy:   95, sc: 0.95 },
    { src: "/eagle.png",         ox: -600, oz: -120, oy:  -80, sc: 0.90 },
  ]},
  { side: "left",  src: "/NASA.png",           vy:  35, shadows: [
    { src: "/SOLIDWORK.png",     ox: -400, oz: -90,  oy: -100, sc: 0.95 },
    { src: "/GROUP3.png",        ox: -600, oz: -120, oy:   90, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP4.png",         vy: -55, shadows: [
    { src: "/GROUP2.png",        ox: -400, oz: -90,  oy:   95, sc: 0.95 },
    { src: "/eagle.png",         ox: -600, oz: -120, oy:  -80, sc: 0.90 },
  ]},
  { side: "right", src: "/NASA.png",           vy:  35, shadows: [
    { src: "/SOLIDWORK.png",     ox: -400, oz: -90,  oy: -100, sc: 0.95 },
    { src: "/GROUP3.png",        ox: -600, oz: -120, oy:   90, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP2.png",         vy:  70, shadows: [
    { src: "/GROUP5.png",        ox: -400, oz: -90,  oy:  -85, sc: 0.95 },
  ]},
  { side: "right", src: "/GROUP1.png",         vy: -200, shadows: [
    { src: "/BCEngeeniring.png", ox: -400, oz: -90,  oy:  110, sc: 0.95 },
    { src: "/GROUP4.png",        ox: -600, oz: -120, oy:  -95, sc: 0.90 },
  ]},
  { side: "left",  src: "/FUSION.png",         vy:  90, shadows: [
    { src: "/GROUP3.png",        ox: -400, oz: -90,  oy:  -75, sc: 0.95 },
    { src: "/NASA.png",          ox: -600, oz: -120, oy:  105, sc: 0.90 },
  ]},
  { side: "right", src: "/GROUP5.png",         vy: -80, shadows: [
    { src: "/GROUP2.png",        ox: -400, oz: -90,  oy:   90, sc: 0.95 },
  ]},
  { side: "left",  src: "/GROUP3.png",         vy:  45, shadows: [
    { src: "/eagle.png",         ox: -400, oz: -90,  oy: -110, sc: 0.95 },
    { src: "/GROUP1.png",        ox: -600, oz: -120, oy:   80, sc: 0.90 },
  ]},
  { side: "right", src: "/SOLIDWORK.png",      vy: -150, shadows: [
    { src: "/GROUP4.png",        ox: -400, oz: -90,  oy:  100, sc: 0.95 },
    { src: "/GROUP3.png",        ox: -600, oz: -120, oy:  -90, sc: 0.90 },
  ]},
  { side: "left",  src: "/eagle.png",          vy:  200, shadows: [
    { src: "/NASA.png",          ox: -400, oz: -90,  oy:  -95, sc: 0.95 },
  ]},
  { side: "right", src: "/GROUP2.png",         vy: -300, shadows: [
    { src: "/GROUP5.png",        ox: -400, oz: -90,  oy:  115, sc: 0.95 },
    { src: "/FUSION.png",        ox: -600, oz: -120, oy:  -85, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP1.png",         vy: -300, shadows: [
    { src: "/BCEngeeniring.png", ox: -400, oz: -90,  oy:   85, sc: 0.95 },
    { src: "/GROUP4.png",        ox: -600, oz: -120, oy: -105, sc: 0.90 },
  ]},
  { side: "right", src: "/NASA.png",           vy:  400, shadows: [
    { src: "/GROUP3.png",        ox: -400, oz: -90,  oy:  -80, sc: 0.95 },
  ]},
  { side: "left",  src: "/GROUP5.png",         vy:  300, shadows: [
    { src: "/GROUP2.png",        ox: -400, oz: -90,  oy:  100, sc: 0.95 },
    { src: "/eagle.png",         ox: -600, oz: -120, oy:  -90, sc: 0.90 },
  ]},
  { side: "right", src: "/GROUP4.png",         vy: -200, shadows: [
    { src: "/GROUP1.png",        ox: -400, oz: -90,  oy:  -95, sc: 0.95 },
    { src: "/SOLIDWORK.png",     ox: -600, oz: -120, oy:  110, sc: 0.90 },
  ]},
];

const QUOTE =
  "MechaEagles is so cool and everyone should join bc its an amazing club and we do really cool stuff. please join mechaeagles we love this club hahaha its really cool ok";

export default function HallwayGallery() {
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const centerViewRef = useRef(null);
  const centerInnerRef = useRef(null);

  const testimonials = useMemo(
    () => [
      { name: "Vedarsh Mishra", role: "Project Manager", avatar: "/team/VedarshMishra.jpg", quote: QUOTE },
      { name: "Austin Kinnealey", role: "Project Manager", avatar: "/team/Austin Kinnealey.jpg", quote: QUOTE },
      { name: "Lucas DiMarco", role: "Science Lead", avatar: "/team/Lucas DiMarco.jpg", quote: QUOTE },
      { name: "Ambrose McCullough", role: "Programmatics Lead", avatar: "/team/Ambrose McCullough.jpg", quote: QUOTE },
      { name: "Sam Kaiser", role: "Engineering Lead", avatar: "/team/Samuel Kaiser.jpg", quote: QUOTE },
    ],
    []
  );

  useEffect(() => {
    const stageEl = stageRef.current;
    const trackEl = trackRef.current;
    const centerViewEl = centerViewRef.current;
    const centerInnerEl = centerInnerRef.current;
    if (!stageEl || !trackEl || !centerViewEl || !centerInnerEl) return;

    const primaryEls = Array.from(trackEl.querySelectorAll("[data-primary]"));
    const shadowEls = Array.from(trackEl.querySelectorAll("[data-shadow]"));
    const allFrameEls = Array.from(trackEl.querySelectorAll("[data-primary],[data-shadow]"));
    if (!primaryEls.length) return;

    const spacingZ = 700;
    const startZ = -26000;
    const WARMUP_Z = 1200;
    const wallX = 750;
    const wallRotY = 71;

    const totalDepth = primaryEls.length * spacingZ;
    const travel = totalDepth * 1.1;

    gsap.set(trackEl, { transformStyle: "preserve-3d" });

    const placePrimary = (el, i) => {
      const isLeft = el.getAttribute("data-side") === "left";
      const vy = parseFloat(el.getAttribute("data-vy") || "0");
      gsap.set(el, {
        x: isLeft ? -wallX : wallX,
        y: vy,
        z: startZ + i * spacingZ + WARMUP_Z,
        rotationY: isLeft ? wallRotY : -wallRotY,
      });
    };

    const placeShadow = (el) => {
      const idx = parseInt(el.getAttribute("data-idx"), 10);
      const isLeft = el.getAttribute("data-side") === "left";
      const ox = parseFloat(el.getAttribute("data-ox"));
      const oz = parseFloat(el.getAttribute("data-oz"));
      const oy = parseFloat(el.getAttribute("data-oy"));
      const sc = parseFloat(el.getAttribute("data-sc"));
      const baseX = isLeft ? -wallX : wallX;
      const baseZ = startZ + idx * spacingZ + WARMUP_Z;

      gsap.set(el, {
        x: baseX + (isLeft ? ox : -ox),
        y: oy,
        z: baseZ + oz,
        rotationY: isLeft ? wallRotY : -wallRotY,
        scale: sc,
      });
    };

    primaryEls.forEach(placePrimary);
    shadowEls.forEach(placeShadow);

    let rafId;
    let opacityRaf;
    let resizeTimer;
    let currentScrollTriggers = [];

    const buildTimelines = () => {
      currentScrollTriggers.forEach((st) => st.kill());
      currentScrollTriggers = [];

      gsap.killTweensOf(allFrameEls);
      gsap.killTweensOf(centerInnerEl);

      primaryEls.forEach(placePrimary);
      shadowEls.forEach(placeShadow);
      gsap.set(centerInnerEl, { y: 0 });

      const centerScrollAmount = Math.max(
        0,
        centerInnerEl.scrollHeight - centerViewEl.clientHeight
      );

      const PRE_TRAVEL = travel * 0.12;
      const MAIN_TRAVEL = travel * 0.72;
      const preCenterTravel = centerScrollAmount * 0.05;
      const mainCenterTravel = centerScrollAmount * 0.95;

      const END_PX = Math.max(900, centerScrollAmount * 1.05);

      const preTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageEl,
          start: "top bottom",
          end: "top top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      allFrameEls.forEach((el) => preTl.to(el, { z: `+=${PRE_TRAVEL}` }, 0));
      preTl.to(centerInnerEl, { y: -preCenterTravel }, 0);
      currentScrollTriggers.push(preTl.scrollTrigger);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageEl,
          start: "top top",
          end: `+=${END_PX}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      allFrameEls.forEach((el) => tl.to(el, { z: `+=${MAIN_TRAVEL}` }, 0));
      tl.to(centerInnerEl, { y: -mainCenterTravel }, 0);
      currentScrollTriggers.push(tl.scrollTrigger);

      ScrollTrigger.refresh();
    };

    rafId = requestAnimationFrame(buildTimelines);

    const FADE_START = -5200;
    const FADE_FULL = -3200;

    const updateOpacity = () => {
      allFrameEls.forEach((el) => {
        const z = Number(gsap.getProperty(el, "z"));
        if (z >= FADE_FULL) {
          el.style.opacity = "1";
        } else if (z <= FADE_START) {
          el.style.opacity = "0";
        } else {
          el.style.opacity = String((z - FADE_START) / (FADE_FULL - FADE_START));
        }
      });
      opacityRaf = requestAnimationFrame(updateOpacity);
    };

    opacityRaf = requestAnimationFrame(updateOpacity);

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildTimelines();
      }, 200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(opacityRaf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      currentScrollTriggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="hallway-section" ref={stageRef}>
      <div style={styles.camera}>
        <div ref={trackRef} style={styles.track}>
          {SLOTS.map((slot, i) => (
            <React.Fragment key={i}>
              {[...slot.shadows].reverse().map((sh, si) => (
                <figure
                  key={`sh-${i}-${si}`}
                  data-shadow
                  data-idx={i}
                  data-side={slot.side}
                  data-ox={sh.ox}
                  data-oz={sh.oz}
                  data-oy={sh.oy}
                  data-sc={sh.sc}
                  style={{
                    ...styles.frame,
                    width: Math.round(420 * sh.sc),
                    height: Math.round(560 * sh.sc),
                  }}
                >
                  <img src={sh.src} alt="" style={styles.img} draggable={false} />
                </figure>
              ))}

              <figure
                data-primary
                data-side={slot.side}
                data-vy={slot.vy}
                style={styles.frame}
              >
                <img src={slot.src} alt="" style={styles.img} draggable={false} />
              </figure>
            </React.Fragment>
          ))}
        </div>

        <div style={styles.fadeTop} />
        <div style={styles.fadeBottom} />

        <div ref={centerViewRef} style={styles.centerViewport}>
          <div ref={centerInnerRef} style={styles.centerInner}>
            {testimonials.map((t, i) => (
              <div key={i} style={styles.card}>
                <div style={styles.topRow}>
                  <img src={t.avatar} alt="" style={styles.avatar} draggable={false} />
                  <div style={styles.topText}>
                    <div style={styles.name}>{t.name}</div>
                    <div style={styles.meta}>
                      {t.role}
                      <span style={styles.dot}> · </span>
                      {t.company}
                    </div>
                  </div>
                </div>
                <p style={styles.quote}>{t.quote}</p>
              </div>
            ))}
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
    overflow: "hidden",
    background: "transparent",
    perspective: "1100px",
    margin: "0 auto",
  },
  track: {
    position: "absolute",
    inset: 0,
    transformStyle: "preserve-3d",
  },
  frame: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 420,
    height: 560,
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    background: "transparent",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  fadeTop: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "40%",
    height: 100,
    background: "linear-gradient(to bottom, var(--page-bg, #000) 30%, transparent 100%)",
    zIndex: 9,
    pointerEvents: "none",
  },
  fadeBottom: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "40%",
    height: 100,
    background: "linear-gradient(to top, var(--page-bg, #000) 30%, transparent 100%)",
    zIndex: 9,
    pointerEvents: "none",
  },
  centerViewport: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(440px, 55vw)",
    height: "74%",
    overflow: "hidden",
    background: "transparent",
    border: "none",
    padding: 0,
    zIndex: 7,
  },
  centerInner: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingBottom: 36,
    marginBottom: 36,
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    objectFit: "cover",
    borderRadius: 8,
    flexShrink: 0,
  },
  topText: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.95)",
    textTransform: "uppercase",
    lineHeight: 1.1,
  },
  meta: {
    fontSize: 13,
    color: "rgba(255,255,255,0.50)",
    letterSpacing: "0.01em",
  },
  dot: {
    opacity: 0.5,
  },
  quote: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.68)",
    textAlign: "left",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to right, rgba(0,0,0,0.85) 0%, transparent 26%, transparent 74%, rgba(0,0,0,0.85) 100%)",
    pointerEvents: "none",
    zIndex: 5,
  },
};