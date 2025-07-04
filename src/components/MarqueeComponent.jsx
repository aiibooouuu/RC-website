import React from 'react';
import Marquee from 'react-fast-marquee';

// Define your image arrays here for easy editing
const top = [
  "/top1.png",
  "/top2.png",
  "/top3.png",
  "/top4.png",
  "/top5.png",
  "/top6.png",
  "/top7.png",
  "/top8.png",
  "/top9.png",
  "/top10.png",
  "/top11.png",
  "/top12.png",
];

const bottom = [
  "/bottom1.png",
  "/bottom2.png",
  "/bottom3.png",
  "/bottom4.png",
  "/bottom5.png",
  "/bottom6.png",
  "/bottom7.png",
  "/bottom8.png",
  "/bottom9.png",
  "/bottom10.png",
  "/bottom11.png",
  "/bottom12.png",
  "/bottom13.png",
  "/bottom14.png",
];

const MarqueeComponent = () => {
  return (
    <div className="marquee-container" style={{ width: "100vw", overflow: "hidden", background: "transparent" }}>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2.5rem",
          letterSpacing: "0.08em",
          color: "#d7b64d",
          marginBottom: "1.5rem",
          marginTop: "0.5rem",
          textTransform: "uppercase"
        }}
      >
        Our Collaborators
      </h2>
      {/* Top Row: 12 images, slower, left to right */}
      <Marquee speed={30} gradient={false} loop={0} direction="left">
        {[...top, ...top].map((src, idx) => (
          <img
            key={`row1-${idx}`}
            src={src}
            alt={`Top ${idx % top.length + 1}`}
            style={{ margin: '0 20px', height: '150px', backgroundColor: '#fff' }}
          />
        ))}
      </Marquee>
      <br />
      {/* Bottom Row: 14 images, faster, right to left */}
      <Marquee speed={80} gradient={false} loop={0} direction="right">
        {[...bottom, ...bottom].map((src, idx) => (
          <img
            key={`row2-${idx}`}
            src={src}
            alt={`Bot ${idx % bottom.length + 1}`}
            style={{ margin: '0 18px', height: '110px', backgroundColor: '#fff'}}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;