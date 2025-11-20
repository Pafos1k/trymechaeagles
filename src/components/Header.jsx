import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="site-header-container header-relative">
        <header>
          <Link
            to="/"
            aria-label="Home"
            className="logo-link"
            onClick={closeMenu}
          >
            <img src="/eagle.png" alt="Logo" className="logo" />
          </Link>

          {/* Hamburger Menu Button - Sticky on mobile */}
          <button
            className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <nav className="desktop-nav">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/team">TEAM</Link>
            <Link to="/sponsors">SPONSORS</Link>
          </nav>

          <div className="contact-tag-box desktop-contact">
            <a
              href="mailto:mechaeagles@bc.edu"
              className="contact-tag"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-tag">
                <span className="dot"></span> CONTACT US
              </div>
            </a>
          </div>
        </header>
      </div>

      {/* Full-screen mobile menu */}
      <div
        className={`mobile-menu-fullscreen ${
          isMenuOpen ? "menu-active" : ""
        }`}
      >
        {/* X BUTTON */}
        <button
          className="mobile-menu-close"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <span className="close-bar"></span>
          <span className="close-bar"></span>
        </button>

        <nav className="mobile-nav">
          <Link to="/" onClick={closeMenu}>
            HOME
          </Link>
          <Link to="/about" onClick={closeMenu}>
            ABOUT
          </Link>
          <Link to="/team" onClick={closeMenu}>
            TEAM
          </Link>
          <Link to="/sponsors" onClick={closeMenu}>
            SPONSORS
          </Link>

          {/* Contact button inside mobile menu */}
          <Link
            to="#"
            className="mobile-contact-link"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "mailto:mechaeagles@bc.edu";
              closeMenu();
            }}
          >
            CONTACT US
          </Link>
        </nav>
      </div>
    </>
  );
}
