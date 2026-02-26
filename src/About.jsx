import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShinyText from "./components/ShinyText";
import HallwayGallery from "./components/HallwayGallery";
import "./About.css";

export default function About() {
  const [active, setActive] = useState("who");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    who: ` MechaEagles is a collegiate BAJA SAE racing and engineering team founded by Boston College students, with the goal of fueling the creative interests of students through constructing & racing karts and other ambitious engineering projects we hope to fulfill down the road.`,
    what: `Founded in fall 2024, the MechaEagles team currently has 60+ active members who are aiming to design, build, and optimize high-performance racing vehicles while our organization fosters and creates an educational, collaborative, and hands-on engineering experience.`,
    ethos: `Within every failure is an opportunity to learn. MechaEagles believes in the values of collaboration, imagination, curiosity, and, of course, execution. We want our members to be able to flex both an understanding of hard science and the skill set of vivid creativity.`,
    legacy: `The legacy of MechaEagles is centered around mentorship and its fruits. We seek to teach future teachers who are always willing to learn, and we seek to use the community we have made to create something powerful.`,
  };

  return (
    <div className="about-page bg-black text-white min-h-screen flex flex-col items-center">
      <Header fixed={true} />

      <main className="container text-center">
        
        {/* WHO WE ARE */}
        <h1 className="who-we-are-title">WHO WE ARE</h1>
        {/* HALLWAY GALLERY */}

        <div className="gallery-section">
          <HallwayGallery />
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