import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import ShinyText from './ShinyText';

const Footer = () => {
  return (
    <>
      {/* Divider Line */}
      <hr className="footer-divider" />

      {/* Footer Section */}
      <footer className="footer-section">
        
        {/* LEFT COLUMN (UNCHANGED — MECHAEAGLES) */}
        <div className="footer-left">
          <h2 className="footer-title">MECHAEAGLES</h2>
          <p className="footer-address">
            EAGLES DON'T JUST FLY—THEY RACE.
          </p>
          <p className="footer-credits">
            CRAFTED BY{' '}
            <a
              href="https://www.linkedin.com/in/vladislav-hoila-54a04125b/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-name-link footer-name-vlad"
            >
              <ShinyText 
                text="VLADISLAV" 
                disabled={false}
                speed={2}
                className="footer-name-shiny"
              />
            </a>{' '}
            AND{' '}
            <a
              href="https://www.linkedin.com/in/armand-koochekzadeh-140236311/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-name-link footer-name-armand"
            >
              <ShinyText 
                text="ARMAND" 
                disabled={false}
                speed={2}
                className="footer-name-shiny"
              />
            </a>
          </p>
        </div>

        {/* ✅ RIGHT SIDE (ONE CLEAN HORIZONTAL ROW) */}
        <div className="footer-row">

          {/* LEFT SOCIALS */}
          <div className="footer-social-left">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.8 2.5 12 2.5 12 2.5h-.1s-4.8 0-8.2.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.4-.9 2.4S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2.1.9 2.7 1 2 .2 8.2.3 8.2.3s4.8 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 14.5V7.9l6.3 3.3-6.3 3.3z"/>
              </svg>
            </a>

            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>

          <div className="footer-center">
            <Link to="/" className="footer-link">HOME</Link>
            <Link to="/about" className="footer-link">ABOUT</Link>
            <Link to="/team" className="footer-link">TEAM</Link>
            <Link to="/sponsors" className="footer-link">SPONSORS</Link>
          </div>

          {/* RIGHT SOCIALS */}
          <div className="footer-social-right">
            <a href="https://www.instagram.com/p/DQSrJk_jYJC/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <a href="https://www.linkedin.com/company/mechaeagles/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* LOOP ANIMATION (UNCHANGED) */}
      <div className="footer-loop">
        <div className="footer-loop-track">
          <div className="footer-loop-content">
            MECHAEAGLES MECHAEAGLES MECHAEAGLES MECHAEAGLES MECHAEAGLES 
            MECHAEAGLES MECHAEAGLES MECHAEAGLES MECHAEAGLES MECHAEAGLES 
            MECHAEAGLES MECHAEAGLES MECHAEAGLES MECHAEAGLES MECHAEAGLES 
            MECHAEAGLES MECHAEAGLES MECHAEAGLES MECHAEAGLES MECHAEAGLES 
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
