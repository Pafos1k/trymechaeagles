import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShinyText from "./components/ShinyText";
import "./Team.css";

export default function Team() {
  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // === Featured top 5 (2 on top row, 3 centered below) ===
  const featured = [
    { id: "f1", name: "Vedarsh Mishra", role: "Project Manager", img: "/team/indian2.png", link: "https://www.linkedin.com/in/vedarsh/" },
    { id: "f2", name: "Austin Kinnealey", role: "Project Manager", img: "/team/featured2.jpg" },
    { id: "f3", name: "Lucas DiMarco", role: "Science Lead", img: "/team/featured3.jpg" },
    { id: "f4", name: "Ambrose McCullough", role: "Programmatics Lead", img: "/team/featured4.jpg" },
    { id: "f5", name: "Sam Kaiser", role: "Engineering Lead", img: "/team/featured5.jpg" },
  ];

  const data = {
    science: [
      { id: "p1", name: "Vladislav Hoila", role: "Full-Stack Developer", img: "/team/Vlad.jpg", link: "https://www.linkedin.com/in/vladislav-hoila-54a04125b" },
      { id: "p2", name: "Armand Koochekzadeh", role: "Full-Stack Developer", img: "/team/programmatics1.jpg", link: "https://www.linkedin.com/in/armand-koochekzadeh-140236311/" },
      { id: "s3", name: "Jack Dauphinais", role: "Head Research Analyst", img: "/team/featured3.jpg" },
      { id: "s4", name: "Joshua Rydzewski", role: "Research Analyst", img: "/team/science1.jpg" },
      { id: "s5", name: "Si Hyun Lee", role: "Research Analyst", img: "/team/science2.jpg" },
      { id: "s6", name: "Vincent Zermani", role: "Research Analyst", img: "/team/science3.jpg" },
      { id: "s7", name: "Christian Roth", role: "Head of Specialization Compliance", img: "/team/featured3.jpg" },
      { id: "s8", name: "Matthew Hark", role: "Specialization Compliance", img: "/team/science1.jpg" },
      { id: "s9", name: "Deven Creeth", role: "Specialization Compliance", img: "/team/science2.jpg" },
      { id: "s10", name: "Leo Wach", role: "Specialization Compliance", img: "/team/science3.jpg" },
      { id: "s11", name: "Leo Wach", role: "Specialization Compliance", img: "/team/science1.jpg" },
      { id: "s12", name: "Atharva Naik", role: "Head of Human Center Development", img: "/team/science2.jpg" },
      { id: "s13", name: "Lucas Baughman", role: "Human Center Development", img: "/team/science3.jpg" },
      { id: "s14", name: "Marguerite Fabian", role: "Human Center Development", img: "/team/science3.jpg" },
    ],

    programmatics: [
      { id: "p1", name: "Maxwell Crawford", role: "Head of Scheduling", img: "/team/programmatics2.jpg" },
      { id: "p2", name: "Yunwan Chon", role: "Scheduling", img: "/team/featured4.jpg" },
      { id: "p3", name: "Carlos Contreras", role: "Scheduling", img: "/team/programmatics1.jpg" },
      { id: "p4", name: "Eric Xie", role: "Scheduling", img: "/team/programmatics2.jpg" },
      { id: "p5", name: "Jack Tommaney", role: "Scheduling", img: "/team/featured4.jpg" },
      { id: "p6", name: "Matthew Mahan", role: "Head of Outreach", img: "/team/programmatics1.jpg" },
      { id: "p7", name: "Sebastian Montoya", role: "Outreach", img: "/team/programmatics2.jpg" },
      { id: "p8", name: "John Slidell", role: "Outreach", img: "/team/featured4.jpg" },
      { id: "p9", name: "Thomas Ogrodnik", role: "Outreach", img: "/team/programmatics1.jpg" },
      { id: "p10", name: "Jonathan Jiao", role: "Head of Finance", img: "/team/featured4.jpg" },
      { id: "p11", name: "Alex Lee", role: "Finance", img: "/team/programmatics1.jpg" },
      { id: "p12", name: "Marcos Garay", role: "Finance", img: "/team/programmatics2.jpg" },
      { id: "p13", name: "Joey Suh", role: "Finance", img: "/team/programmatics2.jpg" },
      { id: "p14", name: "Michael Maurice", role: "Head of Marketing", img: "/team/featured4.jpg" },
      { id: "p15", name: "Brett McDowell", role: "Marketing", img: "/team/programmatics1.jpg" },
      { id: "p16", name: "Madeleine Choe", role: "Marketing", img: "/team/programmatics2.jpg" },
      { id: "p17", name: "Hunter Valentine", role: "Marketing", img: "/team/featured4.jpg" },
      { id: "p18", name: "Charles Anderson", role: "Marketing", img: "/team/programmatics1.jpg" },
      { id: "p19", name: "Emmanuel Bamgbala", role: "Marketing", img: "/team/programmatics2.jpg" },
    ],

    engineering: [
      { id: "e1", name: "Troy Sterling", role: "Head of Suspension", img: "/team/featured5.jpg" },
      { id: "e2", name: "Brian Robles", role: "Suspension Engineer", img: "/team/engineering1.jpg" },
      { id: "e3", name: "Joseph Rusnak", role: "Suspension Engineer", img: "/team/engineering2.jpg" },
      { id: "e4", name: "Taein Kang", role: "Suspension Engineer", img: "/team/engineering3.jpg" },
      { id: "e5", name: "Matthew Bristing", role: "Suspension Engineer", img: "/team/engineering4.jpg" },
      { id: "e6", name: "Tobin Ting", role: "Head of Steering and Braking", img: "/team/featured5.jpg" },
      { id: "e7", name: "Peter Ho", role: "Steering and Braking Engineer", img: "/team/engineering1.jpg" },
      { id: "e8", name: "Devin Dear", role: "Steering and Braking Engineer", img: "/team/engineering2.jpg" },
      { id: "e9", name: "Colin Noble", role: "Steering and Braking Engineer", img: "/team/engineering3.jpg" },
      { id: "e10", name: "Max Pohl", role: "Steering and Braking Engineer", img: "/team/engineering4.jpg" },
      { id: "e11", name: "Jack DelGrande", role: "Head of Fabrication", img: "/team/featured5.jpg" },
      { id: "e12", name: "Kyle Phillips", role: "Fabrication Engineer", img: "/team/engineering1.jpg" },
      { id: "e13", name: "Effie Hatzopoulos", role: "Head of Roll Cage", img: "/team/engineering2.jpg" },
      { id: "e14", name: "Sarah Bland", role: "Roll Cage Engineer", img: "/team/engineering3.jpg" },
      { id: "e15", name: "Samuel Kim", role: "Roll Cage Engineer", img: "/team/engineering4.jpg" },
      { id: "e16", name: "Brandan Brosnan", role: "Roll Cage Engineer", img: "/team/featured5.jpg" },
      { id: "e17", name: "Paul Gin", role: "Roll Cage Engineer", img: "/team/engineering1.jpg" },
      { id: "e18", name: "Asad Faqirzada", role: "Head of Drive Train", img: "/team/engineering2.jpg" },
      { id: "e19", name: "Jack Brogman", role: "Drive Train Engineer", img: "/team/engineering3.jpg" },
      { id: "e20", name: "Lucas Jeff", role: "Drive Train Engineer", img: "/team/engineering4.jpg" },
      { id: "e21", name: "Michael Kester", role: "Drive Train Engineer", img: "/team/featured5.jpg" },
      { id: "e22", name: "Rudolph DeMeo", role: "Drive Train Engineer", img: "/team/engineering1.jpg" },
      { id: "e23", name: "Daniel Martin", role: "Drive Train Engineer", img: "/team/engineering1.jpg" },
    ],
  };

  // Default selection: Science
  const [selected, setSelected] = useState("science");
  const visibleMembers = data[selected];

  return (
    <div className="team-page">
      <Header />

      <main className="team-main">
        {/* ===== Title under navbar ===== */}
        <div className="title-wrap">
          <h1 className="main-title">MEET THE TEAM</h1>
          <div className="subtitle">
            <ShinyText text="2025–2026" />
          </div>
        </div>

        {/* ===== Top featured arrangement ===== */}
        <section className="featured-wrap" aria-label="Featured team">
          <div className="featured-row top">
            {featured.slice(0, 2).map((m) => (
              <div key={m.id} className="featured-item">
                <div className="featured-photo">
                  {m.link ? (
                    <a href={m.link} target="_blank" rel="noopener noreferrer">
                      <img src={m.img} alt={m.name} />
                    </a>
                  ) : (
                    <img src={m.img} alt={m.name} />
                  )}
                </div>
                <div className="featured-name">{m.name}</div>
                <div className="featured-role">
                  <ShinyText text={m.role} />
                </div>
              </div>
            ))}
          </div>

          <div className="featured-row bottom">
            {featured.slice(2).map((m) => (
              <div key={m.id} className="featured-item">
                <div className="featured-photo">
                  {m.link ? (
                    <a href={m.link} target="_blank" rel="noopener noreferrer">
                      <img src={m.img} alt={m.name} />
                    </a>
                  ) : (
                    <img src={m.img} alt={m.name} />
                  )}
                </div>
                <div className="featured-name">{m.name}</div>
                <div className="featured-role">
                  <ShinyText text={m.role} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Switch bar ===== */}
        <div className="switch-wrap" role="tablist" aria-label="Team categories">
          <button
            className={selected === "science" ? "tab active" : "tab"}
            onClick={() => setSelected("science")}
            aria-pressed={selected === "science"}
          >
            SCIENCE
          </button>

          <button
            className={selected === "programmatics" ? "tab active" : "tab"}
            onClick={() => setSelected("programmatics")}
            aria-pressed={selected === "programmatics"}
          >
            PROGRAMMATICS
          </button>

          <button
            className={selected === "engineering" ? "tab active" : "tab"}
            onClick={() => setSelected("engineering")}
            aria-pressed={selected === "engineering"}
          >
            ENGINEERING
          </button>
        </div>

        {/* ===== Members grid ===== */}
        <section className="members-grid" aria-label="Team members grid">
          {visibleMembers.map((m) => (
            <div key={m.id} className="member-card">
              {m.link ? (
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="member-link"
                >
                  <div className="member-circle">
                    <img src={m.img} alt={m.name} />
                  </div>
                  <div className="member-name">{m.name}</div>
                  <div className="member-role">
                    <ShinyText text={m.role} />
                  </div>
                </a>
              ) : (
                <>
                  <div className="member-circle">
                    <img src={m.img} alt={m.name} />
                  </div>
                  <div className="member-name">{m.name}</div>
                  <div className="member-role">
                    <ShinyText text={m.role} />
                  </div>
                </>
              )}
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
