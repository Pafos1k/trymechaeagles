import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const scrollPosition = useRef(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      // Hide hamburger while scrolling
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set new timeout to show hamburger after scrolling stops
      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      // Save current scroll position
      scrollPosition.current = window.scrollY;
      
      // Apply styles to body
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      
      // Prevent touch scrolling
      document.body.style.touchAction = "none";
    } else {
      // Remove styles
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      
      // Restore scroll position
      window.scrollTo(0, scrollPosition.current);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

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
            className={`hamburger-menu ${isMenuOpen ? "open" : ""} ${
              isScrolling ? "hide-on-scroll" : ""
            }`}
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
              <span className="dot"></span> CONTACT US
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