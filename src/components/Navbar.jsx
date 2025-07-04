import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

const links = [
  { name: "Home", href: "#hero" },
  { name: "About Us", href: "#aboutus" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
  { name: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <nav className="navbar-rotaract">
        <div className="navbar-island">
          <div className="navbar-left">
            <img src="/logo.png" alt="Rotaract Logo" className="navbar-logo large" />
            <div className="navbar-title-block navbar-title-mobile">
              <span className="navbar-title-main">Rotaract CRCE</span>
              <span className="navbar-title-sub">Father Conceicao Rodrigues College of Engineering</span>
            </div>
          </div>
          <div className="navbar-links">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="navbar-link">
                <span className="navbar-link-text">{link.name}</span>
                <span className="navbar-link-underline"></span>
              </a>
            ))}
          </div>
          <button
            className="navbar-mobile-menu-btn"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Open menu"
          >
            <FaBars size={28} />
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <>
          <div className="navbar-mobile-backdrop" onClick={closeMobileMenu}></div>
          <div className="navbar-mobile-menu">
            <button className="navbar-mobile-close" onClick={closeMobileMenu}>×</button>
            <div className="navbar-title-block navbar-title-mobile">
              <span className="navbar-title-main">Rotaract CRCE</span>
              <span className="navbar-title-sub">Father Conceicao Rodrigues College of Engineering</span>
            </div>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="navbar-mobile-link"
                onClick={closeMobileMenu}
              >
                {link.name}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;