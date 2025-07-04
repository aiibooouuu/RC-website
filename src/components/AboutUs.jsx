import React, { useRef, useEffect, useState } from "react";
import "./AboutUs.css";

const AboutUs = () => {
  const [inView, setInView] = useState([false, false, false, false]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const handleScroll = () => {
      refs.forEach((ref, idx) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setInView(prev => {
          const updated = [...prev];
          updated[idx] = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.15;
          return updated;
        });
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="aboutus" className="aboutus-section">
      <h2 className="aboutus-heading">ABOUT US</h2>
      <div className="aboutus-bento-grid">
        {/* Left column */}
        <div className="aboutus-bento-left">
          <div
            ref={refs[0]}
            className={`aboutus-bento-box aboutus-bento-banner ${inView[0] ? "in-view" : ""}`}
          >
            <img src="" alt="esecnia  theme banner" />
          </div>
          <div
            ref={refs[1]}
            className={`aboutus-bento-box aboutus-bento-what ${inView[1] ? "in-view" : ""}`}
          >
            <div className="aboutus-bento-title">What is Rotaract CRCE?</div>
            <div className="aboutus-bento-content">
            Rotaract CRCE is a platform where ideas turn into impactful action, and individuals grow into capable, confident leaders. Affiliated with Rotary International, we are a student-led community driven by service, innovation, and a shared commitment to growth.
            <br />
            Through diverse initiatives and thoughtfully designed projects, we strive to make a meaningful difference on campus, in society, and within ourselves. Whether it’s leading teams, forging strong connections, or unlocking hidden potential, every experience here contributes to both personal and collective transformation.
            <br />
            At Rotaract CRCE, we believe growth is not just about what we achieve, but about who we become in the process.            
            </div>
          </div>
        </div>
        {/* Right column */}
        <div className="aboutus-bento-right">
          <div
            ref={refs[2]}
            className={`aboutus-bento-box aboutus-bento-theme ${inView[2] ? "in-view" : ""}`}
          >
            <div className="aboutus-bento-title">Theme: ESSENCIA</div>
            <div className="aboutus-bento-content">
            meaning "essence" or "core" is more than a theme; it’s a return to what truly defines us: clarity, authenticity, and purpose. In a fast-paced world, it calls us to pause, reflect, and act with intention. ESCENCIA is our anchor and compass, guiding how we lead, serve, and grow. Every initiative stems from alignment between our values and vision, ensuring that what we build reflects who we are. It’s not just direction it’s identity.            </div>
          </div>
          <div className="aboutus-bento-bottom-row">
            <div
              ref={refs[3]}
              className={`aboutus-bento-box aboutus-bento-funfact ${inView[3] ? "in-view" : ""}`}
            >
              <div className="aboutus-bento-title"> DID YOU KNOW</div>
              <div className="aboutus-bento-content">
              Rotaract Club of Fr. CRCE proudly organizes the Heart and Sole Run (HSR) in Bandra — one of the largest student-led runs in Mumbai, witnessing over 1200+ participants in its previous edition.
              </div>
            </div>
            <div
              ref={refs[3]}
              className={`aboutus-bento-box aboutus-bento-funfact ${inView[3] ? "in-view" : ""}`}
            >
              <div className="aboutus-bento-title">IMPACT</div>
              <div className="aboutus-bento-content">
                HSR is not just a race but a charitable initiative, with all proceeds dedicated to supporting Father Agnel Ashram and its impactful social causes.


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;