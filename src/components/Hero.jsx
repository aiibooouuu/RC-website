import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";

const quotes = [
"Empowering youth for a better tomorrow.",
"Service above self.",
"Leadership through fellowship.",
"Together, we make a difference."
];

const TypingLoop = () => {
const [quoteIdx, setQuoteIdx] = useState(0);
const [displayed, setDisplayed] = useState("");
const [char, setChar] = useState(0);
const [deleting, setDeleting] = useState(false);

useEffect(() => {
    const text = quotes[quoteIdx];
    let timeout;
    if (!deleting && char < text.length) {
    timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[char]);
        setChar((c) => c + 1);
    }, 70);
    } else if (!deleting && char === text.length) {
    timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && char > 0) {
    timeout = setTimeout(() => {
        setDisplayed((prev) => prev.slice(0, -1));
        setChar((c) => c - 1);
    }, 35);
    } else if (deleting && char === 0) {
    timeout = setTimeout(() => {
        setDeleting(false);
        setQuoteIdx((i) => (i + 1) % quotes.length);
    }, 500);
    }
    return () => clearTimeout(timeout);
}, [char, deleting, quoteIdx]);

return (
    <span className="hero-typewriter hero-typewriter-white">
    {displayed}
    <span className="hero-typewriter-cursor hero-typewriter-cursor-white" />
    </span>
);
};



const verticalMarqueeImages = [
"/rect1.jpg",
"/rect2.jpg",
"/rect3.jpg",
"/rect4.jpg",
"/rect5.jpg",
"/rect6.jpg",
"/rect7.jpg",
];

// Vertical Marquee for desktop
const VerticalMarquee = ({ reverse = false }) => (
<div className={`hero-vertical-marquee${reverse ? " reverse" : ""}`}>
    <div className="hero-vertical-marquee-inner">
    {[...verticalMarqueeImages, ...verticalMarqueeImages].map((src, i) => (
        <img src={src} alt={`marquee${i}`} className="hero-vertical-marquee-img" key={src + i} />
    ))}
    </div>
</div>
);

// Horizontal Marquee for mobile
const HorizontalMarquee = ({ reverse = false }) => (
<div className={`hero-horizontal-marquee${reverse ? " reverse" : ""}`}>
    <div className="hero-horizontal-marquee-inner">
    {[...verticalMarqueeImages, ...verticalMarqueeImages].map((src, i) => (
        <img src={src} alt={`hmarquee${i}`} className="hero-horizontal-marquee-img" key={src + i} />
    ))}
    </div>
</div>
);

const bandSettings = [
{ top: 0, direction: "left", speed: 18 },
{ top: 120, direction: "right", speed: 22 },
{ top: 240, direction: "left", speed: 20 },
{ top: 360, direction: "right", speed: 24 },
{ top: 480, direction: "left", speed: 21 },
];

const MarqueeBand = ({ bandClass, direction = "left" }) => (
<div className={`hero-marquee-bg ${bandClass}`}>
    <div className={`hero-marquee-inner hero-marquee-${direction}`}>
    {/* Repeat images twice for seamless infinite scroll */}
    {[...marqueeImages, ...marqueeImages].map((src, i) => (
        <img src={src} alt={`img${i}`} className="hero-marquee-img" key={src + i} />
    ))}
    </div>
</div>
);

const Hero = () => {
const [inView, setInView] = useState(false);
const [grow, setGrow] = useState(false);
const heroRef = useRef(null);

useEffect(() => {
    const handleScroll = () => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setInView(rect.top < window.innerHeight * 0.7);
    const scrollY = window.scrollY || window.pageYOffset;
    const heroTop = heroRef.current.offsetTop;
    const heroHeight = heroRef.current.offsetHeight;
    if (scrollY > heroTop + heroHeight * 0.2) {
        setGrow(true);
    } else {
        setGrow(false);
    }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
}, []);

return (
    <section id="hero"
    className="hero-modern-bg hero-wave-bg" ref={heroRef}>
    <div className="hero-marquee-layout">
        {/* Left: two marquees side by side */}
        <div className="hero-vertical-marquee-col left">
        <VerticalMarquee />
        </div>
        <div className="hero-center-content">
        {/* Mobile: horizontal marquees above and below */}
        <div className="hero-horizontal-marquee-wrapper">
            <HorizontalMarquee />
        </div>
        <div className="hero-modern-inner">
            <div className="hero-modern-title">
            <div className={`hero-modern-left ${inView ? "slide-in" : ""} ${grow ? "grow" : ""} hero-text-white`}>
                ROTARACT CLUB
            </div>
            <div className={`hero-modern-right ${inView ? "slide-in" : ""} ${grow ? "grow" : ""} hero-text-white`}>
                OF CRCE
            </div>
            </div>
        </div>
        <div className="hero-modern-sub">
            <TypingLoop />
        </div>
        <div className="hero-horizontal-marquee-wrapper">
            <HorizontalMarquee reverse />
        </div>
        </div>
        {/* Right: two marquees side by side */}
        <div className="hero-vertical-marquee-col right">
        <VerticalMarquee reverse />
        </div>
    </div>
    </section>
);
};

export default Hero;