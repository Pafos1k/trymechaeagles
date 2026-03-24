import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShinyText from "./components/ShinyText";
import HallwayGallery from "./components/HallwayGallery";
import "./About.css";

export default function About() {
  const [active, setActive] = useState("who");
  const [humanCenteredExpanded, setHumanCenteredExpanded] = useState(false);

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

        <section
          id="human-centered"
          className="human-centered-section"
          aria-labelledby="human-centered-heading"
        >
          <h2 id="human-centered-heading" className="human-centered-title">
            Human-centered design
          </h2>
          <div className="human-centered-top">
            <figure className="human-centered-media">
              <div
                className="human-centered-image-slot"
                role="img"
                aria-label="Placeholder image for human-centered design"
              >
                <span className="human-centered-image-slot-label">
                  Image placeholder
                </span>
              </div>
              {/* When you have an asset: */}
              {/* <img className="human-centered-image" src="/your-photo.jpg" alt="Describe the photo" /> */}
            </figure>
            <div className="human-centered-intro">
              <p>
                Our engineering puts people first—mentorship inside the team,
                K-12 outreach, how we choose and retire materials, and how we
                run meetings and decisions—not only the car we bring to
                competition.
              </p>
              <p>
                This page highlights the human-centered design philosophy. Our
                work starts with who we teach and serve, how we steward
                resources, and how we hold the organization accountable—not only
                what we build. Below, you can read how that shows up across
                mission, education, responsible engineering, and governance.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="human-centered-show-more"
            onClick={() => setHumanCenteredExpanded((v) => !v)}
            aria-expanded={humanCenteredExpanded}
            aria-controls="human-centered-details"
          >
            {humanCenteredExpanded ? "Show less" : "Show more"}
          </button>

          {humanCenteredExpanded ? (
            <div
              id="human-centered-details"
              className="human-centered-expand"
            >
              <div className="human-centered-grid">
                <article className="human-centered-block">
                  <h3 className="human-centered-block-title">
                    Human-centered mission
                  </h3>
                  <p className="human-centered-block-body">
                    We treat drivers, teammates, and the communities around us as
                    stakeholders in every design choice. Safety, clarity, and
                    inclusion sit alongside lap times—so the car we race reflects
                    the people who build it and the public we represent.
                  </p>
                </article>
                <article className="human-centered-block">
                  <h3 className="human-centered-block-title">
                    Education &amp; outreach (K-12 workshops)
                  </h3>
                  <p className="human-centered-block-body">
                    Hands-on workshops and school visits demystify engineering for
                    younger students. We share how vehicles work, how teams
                    collaborate, and how curiosity turns into structured design—so
                    STEM feels reachable long before college.
                  </p>
                </article>
                <article className="human-centered-block">
                  <h3 className="human-centered-block-title">
                    Responsible engineering (life cycle analysis of materials)
                  </h3>
                  <p className="human-centered-block-body">
                    Material selection is not only about strength and weight. We
                    weigh sourcing, fabrication impact, service life, and
                    end-of-life paths so our builds stay accountable to
                    environmental and human costs—not just what scores on the
                    track.
                  </p>
                </article>
                <article className="human-centered-block">
                  <h3 className="human-centered-block-title">
                    Organizational accountability
                  </h3>
                  <p className="human-centered-block-body">
                    Human-centered design extends to how we run the club: clear
                    ownership, documented decisions, and honest retrospectives.
                    Leaders and subsystems answer to each other and to our values,
                    so the organization stays as intentional as the machine.
                  </p>
                </article>
              </div>
            </div>
          ) : null}
        </section>

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