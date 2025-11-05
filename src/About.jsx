import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DomeGallery from "./components/DomeGallery";
import ShinyText from "./components/ShinyText";
import "./About.css";

export default function About() {
  const [active, setActive] = useState("who");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    who: ` MechaEagles is a high-powered vehicle racing and building team, founded by current Boston College students, with the goal of fueling the creative interests of students through the building and racing of go karts.`,
    what: `Founded in fall 2024, our team is composed of 60+ active members who are aiming to design, build, and optimize high-performance vehicles while fostering a collaborative and hands-on engineering experience.`,
    ethos: `We believe in collaboration, curiosity, and pushing the limits of student engineering. Every failure is an opportunity to learn.`,
    legacy: `Our legacy is built on mentorship, persistence, and the drive to create something extraordinary together.`,
  };

  return (
    <div className="about-page bg-black text-white min-h-screen flex flex-col items-center">
      <Header fixed={true} />

      <main className="container text-center">
        {/* WHO WE ARE */}
        <h1 className="who-we-are-title">WHO WE ARE</h1>

        {/* DOME GALLERY */}
        <div className="gallery-section">
          <DomeGallery />
        </div>

        {/* STATS SECTION */}
        <section className="stats-section">
          <div className="stat">
            <h2>140</h2>
            <ShinyText text="MEMBERS" />
          </div>
          <div className="stat">
            <h2>100%</h2>
            <ShinyText text="UNDERCLASSMEN" />
          </div>
          <div className="stat">
            <h2>18</h2>
            <ShinyText text="MAJORS" />
          </div>
          <div className="stat">
            <h2>89%</h2>
            <ShinyText text="RETENTION Y/Y" />
          </div>
        </section>

        {/* SIDE MENU SECTION */}
        <section className="menu-section">
          {/* LEFT MENU */}
          <div className="menu-left">
            {[
              { key: "who", label: "WHO WE ARE" },
              { key: "what", label: "WHAT WE DO" },
              { key: "ethos", label: "OUR ETHOS" },
              { key: "legacy", label: "LEGACY" },
            ].map((item) => (
              <div
                key={item.key}
                className={`menu-item ${active === item.key ? "active" : ""}`}
                onClick={() => setActive(item.key)}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="menu-right">
            <ShinyText text={content[active]} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
