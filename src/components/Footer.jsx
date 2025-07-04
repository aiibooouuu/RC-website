import React from "react";
import "./Footer.css";

const Footer = () => (
<footer className="footer">
    {/* Golden SVG Waves */}
    <div className="footer-waves">
    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
        d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
        fill="#d7b64d"
        opacity="0.85"
        />
        <path
        d="M0,80 C400,40 1040,160 1440,80 L1440,120 L0,120 Z"
        fill="#d7b64d"
        opacity="0.65"
        />
        <path
        d="M0,100 C500,180 940,20 1440,100 L1440,120 L0,120 Z"
        fill="#d7b64d"
        opacity="0.45"
        />
    </svg>
    </div>
    <div className="footer-content">
    <p className="footer-text">
        © {new Date().getFullYear()} Rotaract CRCE. All Rights Reserved.
    </p>
    </div>
</footer>
);

export default Footer;