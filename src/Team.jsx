import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ShinyText from './components/ShinyText';
import CelestialBackground from './components/CelestialBackground';
import './Team.css';

export default function Team() {
  const [selectedDivision, setSelectedDivision] = useState('science');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pms = [
    { id: 'pm1', name: 'Vedarsh Mishra', role: 'Project Manager', image: '/team/Vedarsh Mishra1.jpg', link: 'https://www.linkedin.com/in/vedarsh/' },
    { id: 'pm2', name: 'Austin Kinnealey', role: 'Project Manager', image: '/team/Austin Kinnealey.jpg', link: 'https://www.linkedin.com/in/austin-kinnealey-9a9755243/' },
  ];

  const leads = [
    { id: 'l1', name: 'Lucas DiMarco', role: 'Science Lead', division: 'science', image: '/team/Lucas DiMarco.jpg', link: 'https://www.linkedin.com/in/lucas-dimarco-427a21243/' },
    { id: 'l2', name: 'Ambrose McCullough', role: 'Programmatics Lead', division: 'programmatics', image: '/team/Ambrose McCullough.jpg', link: 'https://www.linkedin.com/in/ambrosemccullough/' },
    { id: 'l3', name: 'Sam Kaiser', role: 'Engineering Lead', division: 'engineering', image: '/team/Samuel Kaiser.jpg', link: 'https://www.linkedin.com/in/samuel-kaiser1/' },
  ];

  const teamData = {
    science: {
      'Software Development': {
        head: { id: 's1', name: 'Vladislav Hoila', role: 'Head Full-Stack Developer', image: '/team/Vlad1.jpg', link: 'https://www.linkedin.com/in/vladislav-hoila-54a04125b'},
        members: [
          { id: 's2', name: 'Sofi Le', role: 'Full-Stack Developer', image: '/team/Sofi Le.jpg', link: 'https://www.linkedin.com/in/sofile/' },
          { id: 's3', name: 'Sophia Tsepenyuk', role: 'Full-Stack Developer', image: '/team/Sophia Tsepenyuk.jpg', link: 'https://www.linkedin.com/in/sophia-tsepenyuk-4529632b9/' },
          { id: 's4', name: 'Armand Koochekzadeh', role: 'Full-Stack Developer', image: '/team/Armand Koochekzadeh.jpg', link: 'https://www.linkedin.com/in/armand-koochekzadeh-140236311/' },
          { id: 's5', name: 'Patrick Hartanto', role: 'Full-Stack Developer', image: '/team/placeholder.jpg', link: '' },
          { id: 's6', name: 'Ayomidi Bamgbala', role: 'Full-Stack Developer', image: '/team/Ayomidi Bamgbala.jpg', link: 'https://www.linkedin.com/in/bamgbala/' },
        ]
      },

      Science : {
        head: [
          { id: 's7', name: 'Christian Roth', role: 'Head of Spec. Compliance', image: '/team/Christian Roth.jpg', link: 'https://www.linkedin.com/in/christian-roth-198708368/' },
          { id: 's8', name: 'Jack Dauphinais', role: 'Head Research Analyst', image: '/team/Jack Dauphinais.jpg', link: 'https://www.linkedin.com/in/jack-dauphinais-8a7b54294/'},
          { id: 's9', name: 'Atharva Naik', role: 'Head of HCD', image: '/team/Atharva Naik.jpg', link: 'https://www.linkedin.com/in/atharva-naik-732326257/'},
        ],
        members: [
          { id: 's10', name: 'Vincent Zermani', role: 'Research Analyst', image: '/team/Vincent Zemrani.jpg', link: 'https://www.linkedin.com/in/vincentzermani/' },
          { id: 's11', name: 'Joshua Rydzewski', role: 'Research Analyst', image: '/team/Joshua Rudzewski.jpg', link: 'https://www.linkedin.com/in/joshua-rydzewski-3a1b51374/'},
          { id: 's12', name: 'Jinwon Hwang', role: 'Research Analyst', image: '/team/JinwonHwang.jpg', link: 'https://www.linkedin.com/in/jinwon-hwang-bba469342/'}
        ]
      },
    },

    programmatics: {
      'Outreach': {
        head: {id: 'p1', name: 'Maxwell Crawford', role: 'Head of Outreach', image: '/team/Maxwell Crawford.jpg', link: 'https://www.linkedin.com/in/maxwell-crawford-38b5b4281/' },
        members: [
          { id: 'p2', name: 'Zack Donohue', role: 'Outreach', image: '/team/ZackDonohue.jpg', link: 'https://www.linkedin.com/in/zack-donohue-702082354/' },
          { id: 'p3', name: 'Chloe Rhee', role: 'Outreach', image: '/team/ChloeRhee.jpg', link: 'https://www.linkedin.com/in/chloerhee07/'},
          { id: 'p3', name: 'Jaden Han', role: 'Outreach', image: '/team/placeholder.jpg', link: 'https://www.linkedin.com/in/jaden-han-33b02b292/'},
        ]
      },
      'Scheduling': {
        head: {id: 'p5', name: 'Carlos Contreras', role: 'Scheduling', image: '/team/Juan (Carlos) Contreras.jpg', link: 'https://www.linkedin.com/in/juan-contreras-884b69267/'},
        members: [
          { id: 'p6', name: 'Eric Xie', role: 'Scheduling', image: '/team/EricXie.jpg', link: 'https://www.linkedin.com/in/eric-xie-68a620385/' },
          { id: 'p7', name: 'Jack Tommaney', role: 'Scheduling', image: '/team/Jack Tommaney.jpg', link: 'https://www.linkedin.com/in/jack-tommaney-19a598255/' },
        ]
      },
      'Finance': {
        head: [
          { id: 'p8', name: 'Matt Mahan', role: 'Co-Head of Finance', image: '/team/Matt Mahan.jpg', link: 'https://www.linkedin.com/in/matt-mahan-88853a327/' },
          { id: 'p9', name: 'Marcos Garay', role: 'Co-Head of Finance', image: '/team/Marcos Garay.jpg', link: 'https://www.linkedin.com/in/marcos-garay-723b48330/'},
        ],
        members: [
          { id: 'p10', name: '', role: '', image: '/team/Apply.jpg', link: 'https://docs.google.com/forms/d/e/1FAIpQLSdOunUSR7l-q5qoLFwdAk3kbL_Radpw5x2goj_70lSLZm_vgQ/viewform' },
        ]
      },
      'Marketing': {
        head: { id: 'p11', name: 'Michael Maurice', role: 'Head of Marketing', image: '/team/MichaelMaurice.jpg', link: 'https://www.linkedin.com/in/mg-maurice/' },
        members: [
          { id: 'p12', name: 'Benson Lin', role: 'Marketing', image: '/team/benson .jpg', link: 'https://www.linkedin.com/in/benson-lin-527b8335a/' },
        ]
      },
    },

    engineering: {
      'Suspension': {
        head: { id: 'e1', name: 'Troy Sterling', role: 'Head of Suspension', image: '/team/Troy Sterling.jpg', link: 'https://www.linkedin.com/in/troy-sterling-69a835305/' },
        members: [
          { id: 'e2', name: 'Joseph Rusnak', role: 'Suspension Engineer', image: '/team/JoeyRusnak.jpg', link: 'https://www.linkedin.com/in/joey-rusnak-890b8426a/' },
          { id: 'e3', name: 'Christian Roth', role: 'Suspension Engineer', image: '/team/Christian Roth.jpg', link: 'https://www.linkedin.com/in/christian-roth-198708368/' },
          { id: 'e4', name: 'Christian Dorn', role: 'Suspension Engineer', image: '/team/placeholder.jpg', link: 'https://www.linkedin.com/in/christian-dorn-9a50842bb/' },
          { id: 'e5', name: 'Austin Kinnealey', role: 'Suspension Engineer', image: '/team/Austin Kinnealey.jpg', link: 'https://www.linkedin.com/in/austin-kinnealey-9a9755243/' },
        ]
      },
      'Steering and Braking': {
        head: { id: 'e6', name: 'Tobin Ting', role: 'Head of Steering', image: '/team/Tobin Ting.jpg', link: 'https://www.linkedin.com/in/tobin-ting-3b07b527b/' },
        members: [
          { id: 'e7', name: 'Peter Ho', role: 'Steering Engineer', image: '/team/Dat Ho.jpg', link: 'https://www.linkedin.com/in/dat-ho-a70bb7387/' },
          { id: 'e8', name: 'Devin Dear', role: 'Steering Engineer', image: '/team/Devin Dear.jpg', link: 'https://www.linkedin.com/in/devin-dear-1991042aa/' },
          { id: 'e9', name: 'Colin Noble', role: 'Steering Engineer', image: '/team/Colin Noble.jpg', link: 'https://www.linkedin.com/in/colin-noble-b909a0291/' },
          { id: 'e10', name: 'Max Pohl', role: 'Steering Engineer', image: '/team/Max Pohl.jpg', link: 'https://www.linkedin.com/in/max-pohl-94688221b/' },
          { id: 'e11', name: 'Deven Creeth', role: 'Steering Engineer', image: '/team/DevenCreeth.jpg', link: 'https://www.linkedin.com/in/deven-creeth-7b903436a/'},
          ]
      },
        'Roll Cage': {
        head: { id: 'e12', name: 'Paul Gin', role: 'Head of Roll Cage', image: '/team/Paulino Gin.jpg', link: 'https://www.linkedin.com/in/paul-gin/' },
        members: [
          { id: 'e13', name: 'Fernando Loor.', role: 'Roll Cage Engineer', image: '/team/FernandoLoor.jpg', link: 'https://www.linkedin.com/in/fernando-loor-b31aa7315/' },
          { id: 'e14', name: 'Matthew Hark', role: 'Roll Cage Engineer', image: '/team/MatthewHark.jpg', link: 'https://www.linkedin.com/in/matthew-hark-998aab382/' },
          { id: 'e15', name: 'Effie Hatzopoulos', role: 'Roll Cage Engineer', image: '/team/Effie Hatzopoulos.jpg', link: 'https://www.linkedin.com/in/effie-hatzopoulos-14647b307/' },
        ]
      },
      'Drive Train': {
        head: { id: 'e16', name: 'Asad Faqirzada', role: 'Head of Drive Train', image: '/team/Asad Faquirzada.jpg', link: 'https://www.linkedin.com/in/asadfaqirzada/' },
        members: [
          { id: 'e17', name: 'Lucas Jeff', role: 'Drive Train Engineer', image: '/team/Lucas Jeff.jpg', link: 'https://www.linkedin.com/in/lucas-jeff-90919629b/' },
          { id: 'e18', name: 'Michael Kester', role: 'Drive Train Engineer', image: '/team/Michael Kester.jpg', link: 'https://www.linkedin.com/in/michael-kester-121740350/' },
          { id: 'e19', name: 'Rudolph DeMeo', role: 'Drive Train Engineer', image: '/team/Rudolph DeMeo.jpg', link: '' },
          { id: 'e20', name: 'Daniel Martin', role: 'Drive Train Engineer', image: '/team/Daniel Martin.jpg', link: 'https://www.linkedin.com/in/djzmusicborn/' },
        ]
      },
      'Fabrication': {
        head: { id: 'e21', name: 'Jack DelGrande', role: 'Head of Fabrication', image: '/team/Jack DelGrande.jpg', link: 'https://www.linkedin.com/in/jack-delgrande-360a63228/' },
        members: [
          { id: 'e22', name: '', role: '', image: '/team/Apply.jpg', link: 'https://docs.google.com/forms/d/e/1FAIpQLSdOunUSR7l-q5qoLFwdAk3kbL_Radpw5x2goj_70lSLZm_vgQ/viewform' },
        ]
      },

    },
  };


  const Portrait = ({ member, size, isHead, isActiveLead }) => {
    const PortraitInner = () => (
      <div className="portrait-wrapper">
        <div className={`portrait-circle portrait-${size} portrait-default-glow ${isHead ? 'portrait-head-glow' : ''} ${isActiveLead ? 'portrait-lead-glow' : ''}`}>
          <img src={member.image} alt={member.name} />
        </div>
        <div className="portrait-info">
          <h3 className="portrait-name name-glow">{member.name}</h3>
          <div className="portrait-role">
            <ShinyText text={member.role} />
          </div>
        </div>
      </div>
    );

    return member.link ? (
      <a href={member.link} target="_blank" rel="noopener noreferrer" className="portrait-link">
        <PortraitInner />
      </a>
    ) : (
      <PortraitInner />
    );
  };

  return (
    <div className="team-page">
      <CelestialBackground />
      <Header />

      <main className="team-main">
        <div className="title-wrap">
          <h1 className="main-title">MEET THE TEAM</h1>
          <div className="subtitle">
            <ShinyText text="2025–2026" />
          </div>
        </div>

        <section className="pms-section">
          <div className="pms-grid">
            {pms.map(pm => <Portrait key={pm.id} member={pm} size="pm" />)}
          </div>
          <div className="vertical-line shiny-line"></div>
        </section>

        <section className="leads-section">
          <div className="leads-grid">
            {leads.map(lead => (
              <div key={lead.id} className="lead-item">
                <div className="lead-connector shiny-line"></div>
                <button onClick={() => setSelectedDivision(lead.division)} className="lead-button-plain">
                  <Portrait member={lead} size="lead" isActiveLead={selectedDivision === lead.division} />
                </button>
              </div>
            ))}
          </div>

          <div className="switch-wrap">
            <button className={selectedDivision === 'science' ? 'tab active' : 'tab'} onClick={() => setSelectedDivision('science')}>SCIENCE</button>
            <button className={selectedDivision === 'programmatics' ? 'tab active' : 'tab'} onClick={() => setSelectedDivision('programmatics')}>PROGRAMMATICS</button>
            <button className={selectedDivision === 'engineering' ? 'tab active' : 'tab'} onClick={() => setSelectedDivision('engineering')}>ENGINEERING</button>
          </div>
        </section>

        <div className="subteams-container">
          {Object.entries(teamData[selectedDivision]).map(([subteamName, subteam]) => (
            <div key={subteamName} className="subteam-section">
              <div className="subteam-divider">
                <div className="divider-line-left shiny-line"></div>
                <h4 className="subteam-title">
                  <ShinyText text={`${subteamName} Team`} />
                </h4>
                <div className="divider-line-right shiny-line"></div>
              </div>

              <div className="subteam-content">
                <div className="subteam-head-wrapper">
                  <div className="subteam-heads-row">
                    {Array.isArray(subteam.head)
                      ? subteam.head.map(h => (
                          <Portrait key={h.id} member={h} size="head" isHead />
                        ))
                      : <Portrait member={subteam.head} size="head" isHead />
                  }
                  </div>
                <div className="head-connector-line shiny-line"></div>
              </div>
                <div className="subteam-members-grid">
                  {subteam.members.map(m => (
                    <div key={m.id} className="member-item">
                      <div className="member-connector-line shiny-line"></div>
                      <Portrait member={m} size="member" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
