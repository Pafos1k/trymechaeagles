import React, { useEffect } from "react";
import Header from "/src/components/Header.jsx";
import Footer from "/src/components/Footer.jsx";
import ShinyText from "/src/components/ShinyText.jsx";
import "./Sponsors.css";

export default function Sponsors() {
  useEffect(() => {
    window.scrollTo(0, 0);

    document.documentElement.style.backgroundColor = "#000";
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#e7e7e7";

    let io = null;
    function ensureObserver() {
      if (io) return io;
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
      );
      return io;
    }

    function addRevealTargets(scope = document) {
      scope
        .querySelectorAll(".sponsor-card, .sponsors-hero, .sponsors-cta")
        .forEach((el) => el.classList.add("reveal"));
    }

    function observeRevealables(scope = document) {
      const obs = ensureObserver();
      scope.querySelectorAll(".reveal:not(.in)").forEach((el) => obs.observe(el));
    }

    addRevealTargets(document);
    observeRevealables(document);

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    }

    // Card interactions
    const cards = document.querySelectorAll(".sponsor-card");
    cards.forEach((card) => {
      card.addEventListener("click", function (e) {
        const ripple = document.createElement("div");
        ripple.className = "ripple";
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.cssText = `
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          animation: rippleEffect 0.6s ease-out;
        `;
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });

      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });

    // CTA button animation
    const ctaButton = document.querySelector(".cta-button");
    if (ctaButton) {
      ctaButton.addEventListener("click", function () {
        this.style.animation = "buttonPulse 0.5s ease";
        setTimeout(() => (this.style.animation = ""), 500);
      });
    }
  }, []);

  // 🖼️ Sponsor Data
  const sponsors = [
    {
      name: "Premier Partner",
      desc: "Leading innovation in robotics and engineering excellence",
      image: "/SAE.png",
    },
    {
      name: "Technology Leader",
      desc: "Advancing mechanical engineering through cutting-edge solutions",
      image: "/NASA.png",
    },
    {
      name: "Innovation Partner",
      desc: "Supporting the next generation of engineers and innovators",
      image: "/SOLIDWORK.png",
    },
    {
      name: "Strategic Ally",
      desc: "Empowering teams with resources and technical expertise",
      image: "/IGOS.png",
    },
    {
      name: "Technical Partner",
      desc: "Providing state-of-the-art tools and manufacturing support",
      image: "/FUSION365.png",
    },
    {
      name: "Community Supporter",
      desc: "Building the future through educational partnerships",
      image: "/BCEngeeniring.png",
    },
  ];

  return (
    <div className="sponsors-page">
      <Header fixed={false} />

      <main className="sponsors-main">
        <div className="sponsors-container">
          <section className="sponsors-hero reveal">
            <h1 className="sponsors-title">OUR SPONSORS</h1>
            <p className="sponsors-subtitle">
              <ShinyText
                text="Powering Innovation Through Partnership"
                color1="#ffffff"
                speed={4}
              />
            </p>
          </section>


          <section className="sponsors-grid">
            {sponsors.map((s, i) => (
              <div className="sponsor-card reveal" key={i}>
                <div className="sponsor-card-inner">
                  <div className="sponsor-logo-container">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="sponsor-logo"
                      loading="lazy"
                    />
                  </div>
                  <div className="sponsor-info">
                    <h3 className="sponsor-name">{s.name}</h3>
                    <p className="sponsor-description">
                      <ShinyText
                        text={s.desc}
                        color1="#ffffff"
                        speed={5}
                      />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="sponsors-cta reveal">
            <div className="cta-content">
              <h2 className="cta-title">BECOME A SPONSOR</h2>
              <p className="cta-text">
                <ShinyText
                text="Join us in shaping the future of robotics and engineering"
                speed={3}
                />
              </p>
              <button
  type="button"
  className="cta-button"
  onClick={() =>
    (window.location.href =
      "mailto:mechaeagles@bc.edu?subject=Sponsorship%20Inquiry&body=Hi%20MechaEagles%20Team,")
  }
>
  <span className="cta-button-inner">SPONSOR US</span>
</button>

            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
