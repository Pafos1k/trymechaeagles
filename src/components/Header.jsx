import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="site-header-container header-relative">
      <header>
        <Link to="/" aria-label="Home" className="logo-link">
          <img src="/eagle.png" alt="Logo" className="logo" />
        </Link>

        <nav>
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/team">TEAM</Link>
          <Link to="/sponsors">SPONSORS</Link>
        </nav>

        <div className="contact-tag-box">
          <div className="contact-tag">
            <span className="dot"></span> CONTACT US
          </div>
        </div>
      </header>
    </div>
  );
}
