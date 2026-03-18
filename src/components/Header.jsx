import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const scrollPosition = useRef(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Logic: Hide the menu button while scrolling to keep the UI clean
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout]);

  // Logic: Scroll-locking (Prevents the background from moving when mobile menu is open)
  useEffect(() => {
    if (isMenuOpen) {
      scrollPosition.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollPosition.current);
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="site-header-container header-relative">
        <header>
          {/* BC Logo */}
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <img src="/Eagle1.png" alt="BC MechaEagles Logo" className="logo" />
          </Link>

          {/* Hamburger Menu (Mobile) */}
          <button
            className={`hamburger-menu ${isMenuOpen ? "open" : ""} ${
              isScrolling ? "hide-on-scroll" : ""
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* Desktop Links */}
          <nav className="desktop-nav">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/team">TEAM</Link>
            <Link to="/sponsors">SPONSORS</Link>
          </nav>

          {/* BC Maroon Contact Button */}
          <div className="contact-tag-box desktop-contact">
            <a href="mailto:mechaeagles@bc.edu" className="contact-tag">
              <span className="dot"></span> CONTACT US
            </a>
          </div>
        </header>
      </div>

      {/* Full-screen Mobile Overlay */}
      <div className={`mobile-menu-fullscreen ${isMenuOpen ? "menu-active" : ""}`}>
        <button className="mobile-menu-close" onClick={closeMenu}>
          <span className="close-bar"></span>
          <span className="close-bar"></span>
        </button>

        <nav className="mobile-nav">
          <Link to="/" onClick={closeMenu}>HOME</Link>
          <Link to="/about" onClick={closeMenu}>ABOUT</Link>
          <Link to="/team" onClick={closeMenu}>TEAM</Link>
          <Link to="/sponsors" onClick={closeMenu}>SPONSORS</Link>
          <a href="mailto:mechaeagles@bc.edu" className="mobile-contact-link" onClick={closeMenu}>
            CONTACT US
          </a>
        </nav>
      </div>
    </>
  );
}
