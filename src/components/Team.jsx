import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import "./Team.css";

const teamMembers = [
  { name: "Johnson Serrao", role: "President", photo: "/johnson.jpg" },
  { name: "Keegan Estebeiro", role: "Vice President", photo: "/keegan.jpg" },
  { name: "Arnav Ferreira", role: "Secretary", photo: "/arnav.jpg" },
  { name: "Sherlynn Vaz", role: "Joint Secretary", photo: "/sherlynn.jpg" },
  { name: "Naomi Coutinho", role: "Marketing Head", photo: "/naomi.jpg" },
  { name: "Joshua Parmar", role: "PR Head", photo: "/parmar.jpg" },
  { name: "Aaryan Singh", role: "Sergeant at Arms", photo: "/aaryan.jpg" },
  { name: "Abu Hamza", role: "Treasurer and Technical Head", photo: "/hamza.jpg" },
];

const directors = [
  { name: "Bianca Creado ", role: "Club Service Director", photo: "/director1.jpg" },
  { name: "Anjali Rawat", role: "Community Service Director", photo: "/director2.jpg" },
  { name: "Dev Saroj", role: "Profesional Development Director", photo: "/director3.jpg" },
  { name: "Royce Antony", role: "Marketing Director", photo: "/director4.jpg" },
  { name: "Aaron Deniz", role: "Marketing Director", photo: "/director5.jpg" },
  { name: "Avril Fernandes", role: "Public Relations Director", photo: "/director6.jpg" },
  { name: "Chris Perreira", role: "Media Director", photo: "/director7.jpg" },
  { name: "Anushka Kedare", role: "Digital Communications Director", photo: "/director8.jpg" },
  { name: "Ziel Cabral", role: "Digital Communications Director ", photo: "/director9.jpg" },
  { name: "Zeon Dsouza", role: "Technical Director", photo: "/director10.jpg" },
  { name: "Jeremiah Yangal", role: "Operational Director", photo: "/director11.jpg" },
  { name: "Asher Coutinho", role: "Task Force Director", photo: "/director12.jpg" },
];

const socials = [
  { name: "Instagram", icon: <FaInstagram />, link: "#" },
  { name: "LinkedIn", icon: <FaLinkedin />, link: "#" },
  { name: "WhatsApp", icon: <FaWhatsapp />, link: "#" },
];

const Team = () => {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="team">
    <div className="team-section">
      <div className="team-grid-bg"></div>
      <h1 className="team-heading">MEET THE TEAM</h1>
      <div className="team-subheading">CORE TEAM</div>
      <div className="team-grid team-grid-minimal">
        {teamMembers.map((member, idx) => (
          <div
            className="team-card team-card-minimal"
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="team-name">{member.name}</div>
            <picture>
              <source media="(max-width: 900px)" srcSet={member.photo} />
              <img src="/logo.png" alt="logo" className="team-logo-large" />
            </picture>
            <div className="team-bottom">
              <div className="team-role">{member.role}</div>
              <div className="team-socials">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    className="team-social"
                    title={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            {hovered === idx && (
              <div className="team-card-img-topright">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="team-img-popup"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* BOARD OF DIRECTORS SECTION */}
      <h2 className="team-subheading" style={{ marginTop: "3rem" }}>
        BOARD OF  DIRECTORS
      </h2>
      <div className="team-grid team-grid-minimal directors-grid">
        {directors.map((member, idx) => (
          <div
            className=" team-jc"
            key={idx}
            onMouseEnter={() => setHovered(`director-${idx}`)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="team-name">{member.name}</div>
            <picture>
              <source media="(max-width: 900px)" srcSet={member.photo} />
              <img src="/logo.png" alt="logo" className="team-logo-large" />
            </picture>
            <div className="team-bottom">
              <div className="team-role">{member.role}</div>
              <div className="team-socials">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    className="team-social"
                    title={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            {hovered === `director-${idx}` && (
              <div className="team-card-img-topright">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="team-img-popup"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Placeholder Title Section */}
      <h2 className="team-subheading" style={{ marginTop: "3rem" }}>
        SPECIAL MENTIONS
      </h2>
      <div className="special-mentions-row">
        <div
          className="team-card team-card-minimal special-mention-card"
          onMouseEnter={() => setHovered('special-steve')}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="team-name" style={{ textAlign: "center" }}>Steve Anthony</div>
          <img
            src={isMobile ? "/steve.png" : "/logo.png"}
            alt="Steve Anthony"
            className="team-logo-large"
          />
          <div className="team-bottom" style={{ textAlign: "center" }}>
            <div className="team-role">Immediate Past President</div>
            <div className="team-socials" style={{ justifyContent: "center" }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  className="team-social"
                  title={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {!isMobile && hovered === 'special-steve' && (
            <div className="team-card-img-topright">
              <img
                src="/steve.png"
                alt="Steve Anthony"
                className="team-img-popup"
              />
            </div>
          )}
        </div>
        <div className="special-mentions-divider" />
        <div
          className="team-card team-card-minimal special-mention-card"
          onMouseEnter={() => setHovered('special-sangeeta')}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="team-name" style={{ textAlign: "center" }}>Sangeeta</div>
          <img
            src={isMobile ? "/TI.png" : "/logo.png"}
            alt="Sangeeta"
            className="team-logo-large"
          />
          <div className="team-bottom" style={{ textAlign: "center" }}>
            <div className="team-role">Teacher Incharge</div>
            <div className="team-socials" style={{ justifyContent: "center" }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  className="team-social"
                  title={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {!isMobile && hovered === 'special-sangeeta' && (
            <div className="team-card-img-topright">
              <img
                src="/TI.png"
                alt="Sangeeta"
                className="team-img-popup"
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </section>
  );
};

export default Team;