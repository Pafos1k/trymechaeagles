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
        .querySelectorAll(".sponsor-card, .sponsors-hero, .sponsors-cta, .sponsor-tier-section")
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
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });

    document.querySelectorAll(".cta-button").forEach((btn) => {
      btn.addEventListener("click", function () {
        this.style.animation = "buttonPulse 0.5s ease";
        setTimeout(() => (this.style.animation = ""), 500);
      });
    });
  }, []);

  const sponsorTiers = {
    platinum: [
      {
        name: "SolidWorks",
        desc: "Supporting the next generation of engineers and innovators",
        image: "/SOLIDWORK.png",
        donatedAmount: "30 Software Licenses",
      },
      {
        name: "Fusion 360",
        desc: "Providing state-of-the-art tools and manufacturing support",
        image: "/FUSION365.png",
        donatedAmount: "CAD Software Licenses and Manufacturing Support",
      },
      {
        name: "BC Engineering",
        desc: "Building the future through educational partnerships",
        image: "/BCEngeeniring.png",
        donatedAmount: "$30.000",
      },
    ],
    gold: [
      {
        name: "DONATE NOW",
        desc: "Become a Gold Sponsor and support our mission.",
        image: "",
        donatedAmount: "Gold",
      },
    ],
    silver: [
      {
        name: "IGOS Welding",
        desc: "Empowering teams with resources and technical expertise",
        image: "/IGOS.png",
        donatedAmount: "Bolts and Welding Materials",
      },
    ],
    bronze: [
      {
        name: "DONATE NOW",
        desc: "Become a Bronze Sponsor and aid our team's journey.",
        image: "",
        donatedAmount: "Bronze",
      },
    ],
    affiliates: [
      {
        name: "NASA",
        desc: "Leading innovation in robotics and engineering excellence",
        image: "/NASA.png",
        donatedAmount: "Educational Initiative for Lucy Mission",
      },
      {
        name: "SAE",
        desc: "Advancing mechanical engineering through cutting-edge solutions",
        image: "/SAE.png",
        donatedAmount: "Affiliate",
      },
    ],
  };

  const renderCards = (tier) =>
    sponsorTiers[tier].map((s, i) => (
      <div className={`sponsor-card sponsor-card-${tier} reveal`} key={`${tier}-${i}`}>
        <div className="sponsor-card-inner">
          <div className="sponsor-logo-container">
            <img src={s.image} alt={s.name} className="sponsor-logo" loading="lazy" />
          </div>
          <div className="sponsor-info">
            <h3 className="sponsor-name">{s.name}</h3>
            <p className="sponsor-description">
              <ShinyText text={s.desc} color1="#ffffff" speed={5} />
            </p>
          </div>
        </div>
        <div className="sponsor-donation-overlay" aria-hidden="true">
          <span className="sponsor-donation-icon">♥</span>
          <span className="sponsor-donation-label">Donated to us</span>
          <span className="sponsor-donation-amount">{s.donatedAmount}</span>
        </div>
      </div>
    ));

  return (
    <div className="sponsors-page">
      <Header fixed={false} />

      <main className="sponsors-main">
        <div className="sponsors-container">
          <section className="sponsors-hero reveal">
            <div className="sponsors-title-wrapper">
              <div className="sponsors-title-bg">WELCOME!</div>
              <h1 className="sponsors-title-fg">OUR SPONSORS</h1>
            </div>
            <p className="sponsors-subtitle">
              <ShinyText text="POWERING INNOVATION THROUGH PARTNERSHIP" color1="#ffffff" speed={4} />
            </p>
          </section>

          {/* PLATINUM TIER */}
          <section className="sponsor-tier-section reveal">
            <div className="sponsor-tier-divider sponsor-tier-divider-platinum">
              <div className="tier-line" />
              <h2 className="sponsor-tier-title">PLATINUM</h2>
              <div className="tier-line" />
            </div>
            <div className="sponsor-tier-group">
              <div className="sponsors-grid">{renderCards("platinum")}</div>
            </div>
          </section>

          {/* GOLD TIER */}
          <section className="sponsor-tier-section reveal">
            <div className="sponsor-tier-divider sponsor-tier-divider-gold">
              <div className="tier-line" />
              <h2 className="sponsor-tier-title">GOLD</h2>
              <div className="tier-line" />
            </div>
            <div className="sponsor-tier-group">
              <div className="sponsors-grid">{renderCards("gold")}</div>
            </div>
          </section>

          {/* SILVER TIER */}
          <section className="sponsor-tier-section reveal">
            <div className="sponsor-tier-divider sponsor-tier-divider-silver">
              <div className="tier-line" />
              <h2 className="sponsor-tier-title">SILVER</h2>
              <div className="tier-line" />
            </div>
            <div className="sponsor-tier-group">
              <div className="sponsors-grid">{renderCards("silver")}</div>
            </div>
          </section>

          {/* BRONZE TIER */}
          <section className="sponsor-tier-section reveal">
            <div className="sponsor-tier-divider sponsor-tier-divider-bronze">
              <div className="tier-line" />
              <h2 className="sponsor-tier-title">BRONZE</h2>
              <div className="tier-line" />
            </div>
            <div className="sponsor-tier-group">
              <div className="sponsors-grid">{renderCards("bronze")}</div>
            </div>
          </section>

          {/* AFFILIATES TIER */}
          <section className="sponsor-tier-section reveal">
            <div className="sponsor-tier-divider sponsor-tier-divider-affiliates">
              <div className="tier-line" />
              <h2 className="sponsor-tier-title">AFFILIATES</h2>
              <div className="tier-line" />
            </div>
            <div className="sponsor-tier-group">
              <div className="sponsors-grid">{renderCards("affiliates")}</div>
            </div>
          </section>

          {/* BECOME A SPONSOR CTA */}
          <section className="sponsors-cta reveal">
            <div className="cta-content">
              <h2 className="cta-title">BECOME A SPONSOR</h2>
              <p className="cta-text">
                <ShinyText
                  text="Join us in shaping the future of robotics and engineering"
                  speed={3}
                />
              </p>
              <div className="cta-buttons-row">
                <button className="cta-button">
                  <span className="cta-button-inner">SPONSOR INFO</span>
                </button>
                <button className="cta-button">
                  <span className="cta-button-inner">SPONSOR US</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}