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

  // 🖼️ Sponsor Data organized by tiers
  const sponsorTiers = {
    platinum: [
      {
        name: "Premier Partner",
        desc: "Leading innovation in robotics and engineering excellence",
        image: "/SAE.png",
        donatedAmount: "$...",
      },
      {
        name: "Technology Leader",
        desc: "Advancing mechanical engineering through cutting-edge solutions",
        image: "/NASA.png",
        donatedAmount: "$...",
      },
    ],
    gold: [
      {
        name: "Innovation Partner",
        desc: "Supporting the next generation of engineers and innovators",
        image: "/SOLIDWORK.png",
        donatedAmount: "$...",
      },
      {
        name: "Strategic Ally",
        desc: "Empowering teams with resources and technical expertise",
        image: "/IGOS.png",
        donatedAmount: "$...",
      },
    ],
    silver: [
      {
        name: "Technical Partner",
        desc: "Providing state-of-the-art tools and manufacturing support",
        image: "/FUSION365.png",
        donatedAmount: "$...",
      },
      {
        name: "Community Supporter",
        desc: "Building the future through educational partnerships",
        image: "/BCEngeeniring.png",
        donatedAmount: "$...",
      },
    ],
  };

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


          {/* PLATINUM TIER */}
          <section className="sponsor-tier-section reveal">
            <div className="sponsor-tier-banner sponsor-tier-banner-platinum">
              <h2 className="sponsor-tier-title">
                <ShinyText
                  text="Platinum Sponsors"
                  color1="rgba(160, 210, 255, 1)"
                  speed={4}
                />
              </h2>
            </div>
            <div className="sponsor-tier-group sponsor-tier-group-platinum">
              <div className="sponsors-grid">
                {sponsorTiers.platinum.map((s, i) => (
                  <div className="sponsor-card reveal" key={`platinum-${i}`}>
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
                    <div className="sponsor-donation-overlay" aria-hidden="true">
                      <span className="sponsor-donation-icon">♥</span>
                      <span className="sponsor-donation-label">Donated to us</span>
                      <span className="sponsor-donation-amount">{s.donatedAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GOLD TIER */}
          <section className="sponsor-tier-section reveal">
            <div className="sponsor-tier-banner sponsor-tier-banner-gold">
              <h2 className="sponsor-tier-title">
                <ShinyText
                  text="Gold Sponsors"
                  color1="rgba(255, 225, 90, 1)"
                  speed={4}
                />
              </h2>
            </div>
            <div className="sponsor-tier-group sponsor-tier-group-gold">
              <div className="sponsors-grid">
                {sponsorTiers.gold.map((s, i) => (
                  <div className="sponsor-card reveal" key={`gold-${i}`}>
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
                    <div className="sponsor-donation-overlay" aria-hidden="true">
                      <span className="sponsor-donation-icon">♥</span>
                      <span className="sponsor-donation-label">Donated to us</span>
                      <span className="sponsor-donation-amount">{s.donatedAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SILVER TIER */}
          <section className="sponsor-tier-section reveal">
            <div className="sponsor-tier-banner sponsor-tier-banner-silver">
              <h2 className="sponsor-tier-title">
                <ShinyText
                  text="Silver Sponsors"
                  color1="rgba(255, 255, 255, 1)"
                  speed={4}
                />
              </h2>
            </div>
            <div className="sponsor-tier-group sponsor-tier-group-silver">
              <div className="sponsors-grid">
                {sponsorTiers.silver.map((s, i) => (
                  <div className="sponsor-card reveal" key={`silver-${i}`}>
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
                    <div className="sponsor-donation-overlay" aria-hidden="true">
                      <span className="sponsor-donation-icon">♥</span>
                      <span className="sponsor-donation-label">Donated to us</span>
                      <span className="sponsor-donation-amount">{s.donatedAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
              <button className="cta-button">
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
