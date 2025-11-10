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
    { id: "f1", name: "Vedarsh Mishra", role: "Project Manager", img: "/team/Vedarsh Mishra.jpg", link: "https://www.linkedin.com/in/vedarsh/" },
    { id: "f2", name: "Austin Kinnealey", role: "Project Manager", img: "/team/Austin Kinnealey.jpg", link: "https://www.linkedin.com/in/austin-kinnealey-9a9755243/" },
    { id: "f3", name: "Lucas DiMarco", role: "Science Lead", img: "/team/Lucas DiMarco.jpg", link:"https://www.linkedin.com/in/lucas-dimarco-427a21243/" },
    { id: "f4", name: "Ambrose McCullough", role: "Programmatics Lead", img: "/team/Ambrose McCullough.jpg", link: "https://www.linkedin.com/in/ambrosemccullough/" },
    { id: "f5", name: "Sam Kaiser", role: "Engineering Lead", img: "/team/Samuel Kaiser.jpg", link:"https://www.linkedin.com/in/samuel-kaiser1/" },
  ];

  const data = {
    science: [
      { id: "s1", name: "Vladislav Hoila", role: "Full-Stack Developer", img: "/team/Vlad.jpg", link: "https://www.linkedin.com/in/vladislav-hoila-54a04125b" },
      { id: "s2", name: "Armand Koochekzadeh", role: "Full-Stack Developer", img: "/team/Armand Koochekzadeh.jpg", link: "https://www.linkedin.com/in/armand-koochekzadeh-140236311/" },
      { id: "s3", name: "Jack Dauphinais", role: "Head Research Analyst", img: "/team/Jack Dauphinais.jpg", link:"https://www.linkedin.com/in/jack-dauphinais-8a7b54294/" },
      { id: "s4", name: "Joshua Rydzewski", role: "Research Analyst", img: "/team/science1.jpg" },
      { id: "s5", name: "Si Hyun Lee", role: "Research Analyst", img: "/team/Si Hyun Lee.jpg", link: "https://www.linkedin.com/in/si-hyun-lee/"  },
      { id: "s6", name: "Vincent Zermani", role: "Research Analyst", img: "/team/Vincent Zemrani.jpg", link:""},
      { id: "s7", name: "Christian Roth", role: "Head of Specialization Compliance", img: "/team/Christian Roth.jpg", link:"https://www.linkedin.com/in/christian-roth-198708368/" },
      { id: "s8", name: "Matthew Hark", role: "Specialization Compliance", img: "/team/Matthew Hark.jpg", link:"https://www.linkedin.com/in/matthew-hark-998aab382/"},
      { id: "s9", name: "Deven Creeth", role: "Specialization Compliance", img: "/team/Deven Creeth.jpg", link:"https://www.linkedin.com/in/deven-creeth-7b903436a/" },
      { id: "s10", name: "Leo Wach", role: "Specialization Compliance", img: "/team/science3.jpg" },
      { id: "s11", name: "Atharva Naik", role: "Head of HCD", img: "/team/Atharva Naik.jpg", link:"https://www.linkedin.com/in/atharva-naik-732326257/" },
      { id: "s12", name: "Marguerite Fabian", role: "Human Center Development", img: "/team/Marguerite (Meg) Fabian.jpg", link:"https://www.linkedin.com/in/marguerite-fabian-7a9276356/"},
    ],

    programmatics: [
      { id: "p1", name: "Maxwell Crawford", role: "Head of Scheduling", img: "/team/Maxwell Crawford.jpg", link:"https://www.linkedin.com/in/maxwell-crawford-38b5b4281/" },
      { id: "p2", name: "Yunwan Chon", role: "Scheduling", img: "/team/featured4.jpg" },
      { id: "p3", name: "Carlos Contreras", role: "Scheduling", img: "/team/Juan (Carlos) Contreras.jpg", link:"https://www.linkedin.com/in/juan-contreras-884b69267/"},
      { id: "p4", name: "Eric Xie", role: "Scheduling", img: "/team/programmatics2.jpg" },
      { id: "p5", name: "Jack Tommaney", role: "Scheduling", img: "/team/Jack Tommaney.jpg", link:"https://www.linkedin.com/in/jack-tommaney-19a598255/" },
      { id: "p6", name: "Matt Mahan", role: "Head of Outreach", img: "/team/Matt Mahan.jpg", link:"https://www.linkedin.com/in/matt-mahan-88853a327/" },
      { id: "p7", name: "Sebastian Montoya", role: "Outreach", img: "/team/programmatics2.jpg" },
      { id: "p8", name: "Thomas Ogrodnik", role: "Outreach", img: "/team/Thomas Ogrodnik.jpg", link: "https://www.linkedin.com/in/thomas-ogrodnik-295522203/" },
      { id: "p9", name: "Jonathan Jiao", role: "Head of Finance", img: "/team/Jonathan Jiao.jpg", link: "https://www.linkedin.com/in/jonathan-jiao/" },
      { id: "p10", name: "Alex Lee", role: "Finance", img: "/team/Alex Lee.jpg", link:"" },
      { id: "p11", name: "Marcos Garay", role: "Finance", img: "/team/Marcos Garay.jpg", link: "https://www.linkedin.com/in/marcos-garay-723b48330/" },
      { id: "p12", name: "Joey Suh", role: "Finance", img: "/team/programmatics2.jpg" },
      { id: "p13", name: "Michael Maurice", role: "Head of Marketing", img: "/team/featured4.jpg" },
      { id: "p14", name: "Brett McDowell", role: "Marketing", img: "/team/Brett McDowell.jpg", link:"https://www.linkedin.com/in/brett-mcdowell-560148326/" },
      { id: "p15", name: "Charles Anderson", role: "Marketing", img: "/team/programmatics2.jpg" },
      { id: "p16", name: "Madeleine Choe", role: "Marketing", img: "/team/featured4.jpg" },
      { id: "p17", name: "Benson Lin", role: "Marketing", img: "/team/benson .jpg", link:"https://www.linkedin.com/in/benson-lin-527b8335a/" },
    ],

    engineering: [
      { id: "e1", name: "Troy Sterling", role: "Head of Suspension", img: "/team/Troy Sterling.jpg", link:"https://www.linkedin.com/in/troy-sterling-69a835305/"},
      { id: "e2", name: "Jack Brogman", role: "Drive Train Engineer", img: "/team/Jack Brogan.jpg", link:"https://www.linkedin.com/in/jack-brogan-19893020b/" },
      { id: "e3", name: "Joseph Rusnak", role: "Suspension Engineer", img: "/team/engineering2.jpg" },
      { id: "e4", name: "Taein Kang", role: "Suspension Engineer", img: "/team/Taein Kang.jpg", link: "https://www.linkedin.com/in/taein-kang-05b68323b/"},
      { id: "e5", name: "Matthew Bristing", role: "Suspension Engineer", img: "/team/Matthew Bristing.jpg", link:"" },
      { id: "e6", name: "Tobin Ting", role: "Head of Steering", img: "/team/Tobin Ting.jpg", link:"https://www.linkedin.com/in/tobin-ting-3b07b527b/" },
      { id: "e7", name: "Peter Ho", role: "Steering Engineer", img: "/team/Dat Ho.jpg", link:" https://www.linkedin.com/in/dat-ho-a70bb7387/"},
      { id: "e8", name: "Devin Dear", role: "Steering Engineer", img: "/team/Devin Dear.jpg", link:"https://www.linkedin.com/in/devin-dear-1991042aa/" },
      { id: "e9", name: "Colin Noble", role: "Steering Engineer", img: "/team/Colin Noble.jpg", link:"https://www.linkedin.com/in/colin-noble-b909a0291/" },
      { id: "e10", name: "Max Pohl", role: "Steering Engineer", img: "/team/Max Pohl.jpg", link:"https://www.linkedin.com/in/max-pohl-94688221b/" },
      { id: "e11", name: "Jack DelGrande", role: "Head of Fabrication", img: "/team/Jack DelGrande.jpg", link:"https://www.linkedin.com/in/jack-delgrande-360a63228/" },
      { id: "e12", name: "Kyle Phillips", role: "Fabrication Engineer", img: "/team/Kyle Phillips.jpg", link:"https://www.linkedin.com/in/kyle-phillips-8bba3b255/" },
      { id: "e13", name: "Effie Hatzopoulos", role: "Head of Roll Cage", img: "/team/Effie Hatzopoulos.jpg", link:"" },
      { id: "e14", name: "Samuel Kim", role: "Roll Cage Engineer", img: "/team/engineering3.jpg" },
      { id: "e15", name: "Hunter Valentine", role: "Roll Cage Engineer", img: "/team/Hunter Valentine.jpg", link:"https://www.linkedin.com/in/hunter-valentine-b77910359/"},
      { id: "e16", name: "Paul Gin", role: "Roll Cage Engineer", img: "/team/Paulino Gin.jpg", link:"https://www.linkedin.com/in/paul-gin/" },
      { id: "e17", name: "Asad Faqirzada", role: "Head of Drive Train", img: "/team/Asad Faquirzada.jpg", link:"https://www.linkedin.com/in/asadfaqirzada/"},
      { id: "e18", name: "Lucas Jeff", role: "Drive Train Engineer", img: "/team/Lucas Jeff.jpg", link:"https://www.linkedin.com/in/lucas-jeff-90919629b/" },
      { id: "e19", name: "Michael Kester", role: "Drive Train Engineer", img: "/team/Michael Kester.jpg", link:"https://www.linkedin.com/in/michael-kester-121740350/" },
      { id: "e20", name: "Rudolph DeMeo", role: "Drive Train Engineer", img: "/team/Rudolph DeMeo.jpg" },
      { id: "e21", name: "Daniel Martin", role: "Drive Train Engineer", img: "/team/Daniel Martin.jpg", link:"https://www.linkedin.com/in/djzmusicborn/" },
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
