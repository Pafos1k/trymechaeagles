import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLOTS = [
  { side: "left",  src: "/GROUP1.png", yOffset: -60, shadows: [
    { src: "/GROUP3.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP5.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "right", src: "/GROUP2.png", yOffset: 40, shadows: [
    { src: "/GROUP4.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP1.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "left",  src: "/GROUP5.png", yOffset: -20, shadows: [
    { src: "/GROUP1.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP3.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "right", src: "/GROUP4.png", yOffset: 80, shadows: [
    { src: "/BCEngeeniring.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP2.png",        ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "left",  src: "/GROUP3.png", yOffset: -100, shadows: [
    { src: "/GROUP1.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP5.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "right", src: "/BCEngeeniring.png", yOffset: 30, shadows: [
    { src: "/GROUP4.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP2.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "left",  src: "/GROUP1.png", yOffset: 50, shadows: [
    { src: "/GROUP5.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP3.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "right", src: "/GROUP2.png", yOffset: -40, shadows: [
    { src: "/GROUP4.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP1.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "left",  src: "/GROUP5.png", yOffset: 70, shadows: [
    { src: "/GROUP3.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP1.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "right", src: "/GROUP4.png", yOffset: -80, shadows: [
    { src: "/GROUP2.png",        ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/BCEngeeniring.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "left",  src: "/GROUP3.png", yOffset: -30, shadows: [
    { src: "/GROUP1.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP5.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "right", src: "/GROUP2.png", yOffset: 60, shadows: [
    { src: "/GROUP4.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP1.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "left",  src: "/GROUP1.png", yOffset: -70, shadows: [
    { src: "/GROUP3.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP5.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
  { side: "right", src: "/BCEngeeniring.png", yOffset: 20, shadows: [
    { src: "/GROUP4.png", ox: -120, oz: -120, sc: 0.88, opacity: 0.6  },
    { src: "/GROUP2.png", ox: -230, oz: -240, sc: 0.76, opacity: 0.35 },
  ]},
];

const QUOTE = "MechaEagles is so cool and everyone should join bc its an amazing club and we do really cool stuff. please join mechaeagles we love this club hahaha its really cool ok";

export default function HallwayGallery() {
  const stageRef       = useRef(null);
  const trackRef       = useRef(null);
  const centerViewRef  = useRef(null);
  const centerInnerRef = useRef(null);

  const testimonials = useMemo(() => [
    { name: "PAUL DAVIDSON",   role: "Head of Product", company: "Neon Bank",    avatar: "/FUSION.png",  quote: QUOTE },
    { name: "KATE WELLINGTON", role: "CMO",             company: "Alder Home",   avatar: "/NASA.png",    quote: QUOTE },
    { name: "MAYA RONAN",      role: "Founder",         company: "Vello Bikes",  avatar: "/SAE.png",     quote: QUOTE },
    { name: "JAMES FORD",      role: "CEO",             company: "Stacklane",    avatar: "/GROUP1.png",  quote: QUOTE },
    { name: "SARA LINDQVIST",  role: "VP Design",       company: "Orbit Health", avatar: "/GROUP2.png",  quote: QUOTE },
  ], []);

  useEffect(() => {
    const stageEl       = stageRef.current;
    const trackEl       = trackRef.current;
    const centerViewEl  = centerViewRef.current;
    const centerInnerEl = centerInnerRef.current;
    if (!stageEl || !trackEl || !centerViewEl || !centerInnerEl) return;

    const primaryEls  = Array.from(trackEl.querySelectorAll("[data-primary]"));
    const shadowEls   = Array.from(trackEl.querySelectorAll("[data-shadow]"));
    const allFrameEls = Array.from(trackEl.querySelectorAll("[data-primary],[data-shadow]"));
    if (!primaryEls.length) return;

    const spacingZ = 420;
    const startZ   = -6000;
    const WARMUP_Z = 1200;
    const wallX    = 620;
    const wallRotY = 62;

    const totalDepth = primaryEls.length * spacingZ;
    const travel     = totalDepth * 1.1;

    gsap.set(trackEl, { transformStyle: "preserve-3d" });

    // Position primary panels
    primaryEls.forEach((el, i) => {
      const side    = el.getAttribute("data-side");
      const isLeft  = side === "left";
      const yOffset = parseFloat(el.getAttribute("data-yoffset") || "0");
      gsap.set(el, {
        x: isLeft ? -wallX : wallX,
        y: yOffset,
        z: startZ + i * spacingZ + WARMUP_Z,
        rotationY: isLeft ? wallRotY : -wallRotY,
      });
    });

    // Position shadow panels
    shadowEls.forEach((el) => {
      const idx    = parseInt(el.getAttribute("data-idx"));
      const side   = el.getAttribute("data-side");
      const isLeft = side === "left";
      const ox     = parseFloat(el.getAttribute("data-ox"));
      const oz     = parseFloat(el.getAttribute("data-oz"));
      const sc     = parseFloat(el.getAttribute("data-sc"));
      const yOffset = parseFloat(el.getAttribute("data-yoffset") || "0");
      const baseX  = isLeft ? -wallX : wallX;
      const baseZ  = startZ + idx * spacingZ + WARMUP_Z;

      gsap.set(el, {
        x: baseX + (isLeft ? ox : -ox),
        y: yOffset,
        z: baseZ + oz,
        rotationY: isLeft ? wallRotY : -wallRotY,
        scale: sc,
      });
    });

    let rafId;
    let currentScrollTriggers = [];

    const buildTimelines = () => {
      currentScrollTriggers.forEach((st) => st.kill());
      currentScrollTriggers = [];
      gsap.killTweensOf(centerInnerEl);

      gsap.set(centerInnerEl, { y: 0 });

      const centerScrollAmount = Math.max(0, centerInnerEl.scrollHeight - centerViewEl.clientHeight);
      const END_PX = centerScrollAmount + 300;

      const PRE_TRAVEL      = travel * 0.12;
      const preCenterTravel = centerScrollAmount * 0.05;

      const preTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageEl,
          start: "top bottom",
          end:   "top top",
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
          start:      "top top",
          end:        `+=${END_PX}`,
          scrub:      true,
          pin:        true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });
      allFrameEls.forEach((el) => tl.to(el, { z: `+=${travel}` }, 0));
      tl.to(centerInnerEl, { y: -(centerScrollAmount - preCenterTravel) }, 0);
      currentScrollTriggers.push(tl.scrollTrigger);

      ScrollTrigger.refresh();
    };

    rafId = requestAnimationFrame(buildTimelines);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        primaryEls.forEach((el, i) => {
          const side    = el.getAttribute("data-side");
          const isLeft  = side === "left";
          const yOffset = parseFloat(el.getAttribute("data-yoffset") || "0");
          gsap.set(el, {
            x: isLeft ? -wallX : wallX,
            y: yOffset,
            z: startZ + i * spacingZ + WARMUP_Z,
            rotationY: isLeft ? wallRotY : -wallRotY,
          });
        });
        shadowEls.forEach((el) => {
          const idx     = parseInt(el.getAttribute("data-idx"));
          const side    = el.getAttribute("data-side");
          const isLeft  = side === "left";
          const ox      = parseFloat(el.getAttribute("data-ox"));
          const oz      = parseFloat(el.getAttribute("data-oz"));
          const sc      = parseFloat(el.getAttribute("data-sc"));
          const yOffset = parseFloat(el.getAttribute("data-yoffset") || "0");
          gsap.set(el, {
            x: (isLeft ? -wallX : wallX) + (isLeft ? ox : -ox),
            y: yOffset,
            z: startZ + idx * spacingZ + WARMUP_Z + oz,
            rotationY: isLeft ? wallRotY : -wallRotY,
            scale: sc,
          });
        });
        buildTimelines();
      }, 200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="hallway-section" ref={stageRef}>
      <div style={styles.camera}>

        {/* 3-D scene track */}
        <div ref={trackRef} style={styles.track}>
          {SLOTS.map((slot, i) => (
            <React.Fragment key={i}>
              {/* Shadows rendered back-to-front (reverse order) */}
              {[...slot.shadows].reverse().map((sh, si) => (
                <figure
                  key={`sh-${i}-${si}`}
                  data-shadow
                  data-idx={i}
                  data-side={slot.side}
                  data-ox={sh.ox}
                  data-oz={sh.oz}
                  data-sc={sh.sc}
                  data-yoffset={slot.yOffset ?? 0}
                  style={{
                    ...styles.frame,
                    width:   Math.round(340 * sh.sc),
                    height:  Math.round(500 * sh.sc),
                    opacity: sh.opacity ?? 0.55,
                  }}
                >
                  <img src={sh.src} alt="" style={styles.img} draggable={false} />
                </figure>
              ))}

              {/* Primary panel */}
              <figure
                data-primary
                data-side={slot.side}
                data-yoffset={slot.yOffset ?? 0}
                style={styles.frame}
              >
                <img src={slot.src} alt="" style={styles.img} draggable={false} />
              </figure>
            </React.Fragment>
          ))}
        </div>

        {/* Top & bottom fades */}
        <div style={styles.fadeTop} />
        <div style={styles.fadeBottom} />

        {/* Testimonial column */}
        <div ref={centerViewRef} style={styles.centerViewport}>
          <div ref={centerInnerRef} style={styles.centerInner}>
            {testimonials.map((t, i) => (
              <div key={i} style={styles.card}>
                <div style={styles.topRow}>
                  <img src={t.avatar} alt={t.name} style={styles.avatar} draggable={false} />
                  <div style={styles.topText}>
                    <div style={styles.name}>{t.name}</div>
                    <div style={styles.meta}>
                      {t.role}<span style={styles.dot}> · </span>{t.company}
                    </div>
                  </div>
                </div>
                <p style={styles.quote}>{t.quote}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Left/right vignette */}
        <div style={styles.vignette} />
      </div>
    </section>
  );
}

const styles = {
  camera: {
    position:    "relative",
    width:       "min(1400px, 96vw)",
    height:      "min(760px, 82vh)",
    overflow:    "hidden",
    background:  "transparent",
    perspective: "800px",
    margin:      "0 auto",
  },

  track: {
    position:       "absolute",
    inset:          0,
    transformStyle: "preserve-3d",
  },

  frame: {
    position:  "absolute",
    top:       "50%",
    left:      "50%",
    width:     340,
    height:    500,
    transform: "translate(-50%, -50%)",
    overflow:  "hidden",
    background: "transparent",
    margin:    0,
    padding:   0,
    border:    "none",
  },

  img: {
    width:     "100%",
    height:    "100%",
    objectFit: "cover",
    display:   "block",
  },

  fadeTop: {
    position:   "absolute",
    top:        0,
    left:       "50%",
    transform:  "translateX(-50%)",
    width:      "44%",
    height:     110,
    background: "linear-gradient(to bottom, var(--page-bg, #000) 30%, transparent 100%)",
    zIndex:     9,
    pointerEvents: "none",
  },

  fadeBottom: {
    position:   "absolute",
    bottom:     0,
    left:       "50%",
    transform:  "translateX(-50%)",
    width:      "44%",
    height:     110,
    background: "linear-gradient(to top, var(--page-bg, #000) 30%, transparent 100%)",
    zIndex:     9,
    pointerEvents: "none",
  },

  centerViewport: {
    position:  "absolute",
    left:      "50%",
    top:       "50%",
    transform: "translate(-50%, -50%)",
    width:     "min(420px, 52vw)",
    height:    "74%",
    overflow:  "hidden",
    zIndex:    10,
    background: "transparent",
    border:    "none",
    padding:   0,
  },

  centerInner: {
    position:      "relative",
    width:         "100%",
    display:       "flex",
    flexDirection: "column",
    gap:           0,
  },

  card: {
    display:        "flex",
    flexDirection:  "column",
    gap:            16,
    background:     "rgba(0,0,0,0.45)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    borderRadius:   10,
    padding:        "20px 22px",
    marginBottom:   36,
    borderBottom:   "1px solid rgba(255,255,255,0.07)",
  },

  topRow: {
    display:    "flex",
    alignItems: "center",
    gap:        16,
  },

  avatar: {
    width:        52,
    height:       52,
    objectFit:    "cover",
    borderRadius: 8,
    flexShrink:   0,
  },

  topText: {
    display:       "flex",
    flexDirection: "column",
    gap:           4,
  },

  name: {
    fontSize:      15,
    fontWeight:    800,
    letterSpacing: "0.06em",
    color:         "rgba(255,255,255,0.95)",
    textTransform: "uppercase",
    lineHeight:    1.1,
  },

  meta: {
    fontSize:      13,
    color:         "rgba(255,255,255,0.50)",
    letterSpacing: "0.01em",
  },

  dot: { opacity: 0.5 },

  quote: {
    margin:     0,
    fontSize:   15,
    lineHeight: 1.65,
    color:      "rgba(255,255,255,0.72)",
    textAlign:  "left",
  },

  vignette: {
    position:      "absolute",
    inset:         0,
    background:    "linear-gradient(to right, rgba(0,0,0,0.88) 0%, transparent 32%, transparent 68%, rgba(0,0,0,0.88) 100%)",
    pointerEvents: "none",
    zIndex:        5,
  },
};