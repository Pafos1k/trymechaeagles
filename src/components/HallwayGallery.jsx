import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ox is now NEGATIVE — shadows offset away from center (outward, toward screen edge)
// so depth stacks behind the primary, not poking into the text area
const SLOTS = [
  { side: "left",  src: "/GROUP1.png", shadows: [
    { src: "/GROUP3.png", ox: -160, oz: -90,  sc: 0.95 },
    { src: "/GROUP5.png", ox: -300, oz: -170, sc: 0.90 },
  ]},
  { side: "right", src: "/GROUP2.png", shadows: [
    { src: "/GROUP4.png", ox: -160, oz: -90, sc: 0.95 },
  ]},
  { side: "left",  src: "/GROUP5.png", shadows: [] },
  { side: "right", src: "/GROUP4.png", shadows: [
    { src: "/BCEngeeniring.png", ox: -160, oz: -90,  sc: 0.95 },
    { src: "/GROUP2.png",        ox: -300, oz: -170, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP3.png", shadows: [
    { src: "/GROUP1.png", ox: -160, oz: -90, sc: 0.95 },
  ]},
  { side: "right", src: "/BCEngeeniring.png", shadows: [] },
  { side: "left",  src: "/GROUP1.png", shadows: [
    { src: "/GROUP5.png", ox: -160, oz: -90,  sc: 0.95 },
    { src: "/GROUP3.png", ox: -300, oz: -170, sc: 0.90 },
  ]},
  { side: "right", src: "/GROUP2.png", shadows: [
    { src: "/GROUP4.png", ox: -160, oz: -90, sc: 0.95 },
  ]},
  { side: "left",  src: "/GROUP5.png", shadows: [] },
  { side: "right", src: "/GROUP4.png", shadows: [
    { src: "/GROUP2.png",        ox: -160, oz: -90,  sc: 0.95 },
    { src: "/BCEngeeniring.png", ox: -300, oz: -170, sc: 0.90 },
  ]},
  { side: "left",  src: "/GROUP3.png", shadows: [
    { src: "/GROUP1.png", ox: -160, oz: -90, sc: 0.95 },
  ]},
  { side: "right", src: "/GROUP2.png", shadows: [] },
  { side: "left",  src: "/GROUP1.png", shadows: [
    { src: "/GROUP3.png", ox: -160, oz: -90,  sc: 0.95 },
    { src: "/GROUP5.png", ox: -300, oz: -170, sc: 0.90 },
  ]},
  { side: "right", src: "/BCEngeeniring.png", shadows: [
    { src: "/GROUP4.png", ox: -160, oz: -90, sc: 0.95 },
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

    const spacingZ = 380;
    const startZ   = -6000;
    const WARMUP_Z = 1200;
    const wallX    = 480;
    const wallRotY = 62;

    const totalDepth = primaryEls.length * spacingZ;
    const travel     = totalDepth * 1.1;

    gsap.set(trackEl, { transformStyle: "preserve-3d" });

    primaryEls.forEach((el, i) => {
      const side   = el.getAttribute("data-side");
      const isLeft = side === "left";
      gsap.set(el, {
        x: isLeft ? -wallX : wallX,
        y: 0,
        z: startZ + i * spacingZ + WARMUP_Z,
        rotationY: isLeft ? wallRotY : -wallRotY,
      });
    });

    shadowEls.forEach((el) => {
      const idx    = parseInt(el.getAttribute("data-idx"));
      const side   = el.getAttribute("data-side");
      const isLeft = side === "left";
      const ox     = parseFloat(el.getAttribute("data-ox")); // already signed correctly
      const oz     = parseFloat(el.getAttribute("data-oz"));
      const sc     = parseFloat(el.getAttribute("data-sc"));
      const baseX  = isLeft ? -wallX : wallX;
      const baseZ  = startZ + idx * spacingZ + WARMUP_Z;
      gsap.set(el, {
        // For left wall: negative ox moves further left (outward/away from center)
        // For right wall: positive ox moves further right (outward/away from center)
        // ox in data is negative, so: left adds negative (goes left), right subtracts negative (goes right)
        x: baseX + (isLeft ? ox : -ox),
        y: 0,
        z: baseZ + oz,
        rotationY: isLeft ? wallRotY : -wallRotY,
        scale: sc,
      });
    });

    let rafId;
    let currentScrollTriggers = [];

    const buildTimelines = () => {
      // Kill previous ScrollTriggers before rebuilding
      currentScrollTriggers.forEach((st) => st.kill());
      currentScrollTriggers = [];
      gsap.killTweensOf(centerInnerEl);

      // Reset centerInner position before measuring
      gsap.set(centerInnerEl, { y: 0 });

      // Measure AFTER layout settles at current viewport size
      const centerScrollAmount = Math.max(0, centerInnerEl.scrollHeight - centerViewEl.clientHeight);
      const END_PX = centerScrollAmount + 300; // generous buffer for mobile
      const PRE_TRAVEL      = travel * 0.12;
      const preCenterTravel = centerScrollAmount * 0.05;

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
        // Reset frame Z positions before rebuild
        primaryEls.forEach((el, i) => {
          const side   = el.getAttribute("data-side");
          const isLeft = side === "left";
          gsap.set(el, {
            x: isLeft ? -wallX : wallX,
            y: 0,
            z: startZ + i * spacingZ + WARMUP_Z,
            rotationY: isLeft ? wallRotY : -wallRotY,
          });
        });
        shadowEls.forEach((el) => {
          const idx    = parseInt(el.getAttribute("data-idx"));
          const side   = el.getAttribute("data-side");
          const isLeft = side === "left";
          const ox     = parseFloat(el.getAttribute("data-ox"));
          const oz     = parseFloat(el.getAttribute("data-oz"));
          const sc     = parseFloat(el.getAttribute("data-sc"));
          gsap.set(el, {
            x: (isLeft ? -wallX : wallX) + (isLeft ? ox : -ox),
            y: 0,
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
                  data-sc={sh.sc}
                  style={{
                    ...styles.frame,
                    width:  Math.round(340 * sh.sc),
                    height: Math.round(460 * sh.sc),
                  }}
                >
                  <img src={sh.src} alt="" style={styles.img} draggable={false} />
                </figure>
              ))}
              <figure data-primary data-side={slot.side} style={styles.frame}>
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
                      {t.role}<span style={styles.dot}> · </span>{t.company}
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
    width: 340,
    height: 460,
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    background: "transparent",
  },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
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
  dot: { opacity: 0.5 },
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
    background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.75) 100%)",
    pointerEvents: "none",
    zIndex: 5,
  },
};