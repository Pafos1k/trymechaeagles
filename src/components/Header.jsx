import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu when hiding
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={`site-header-container header-relative ${!isVisible ? 'header-hidden' : ''}`}>
      <header>
        <Link to="/" aria-label="Home" className="logo-link" onClick={closeMenu}>
          <img src="/eagle.png" alt="Logo" className="logo" />
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={isMenuOpen ? "nav-open" : ""}>
          <Link to="/" onClick={closeMenu}>HOME</Link>
          <Link to="/about" onClick={closeMenu}>ABOUT</Link>
          <Link to="/team" onClick={closeMenu}>TEAM</Link>
          <Link to="/sponsors" onClick={closeMenu}>SPONSORS</Link>
          
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

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </div>
  );
}