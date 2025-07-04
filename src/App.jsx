import React, { useEffect, useState } from "react";
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Events from "./components/Events";
import Team from "./components/Team";
import MarqueeComponent from "./components/MarqueeComponent";
import Contact from "./components/Contact";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4700); // 3.3 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  if (loading) return <Loader />;
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Events />
      <Team />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <MarqueeComponent />
      <br />
      <br />
      <br />
      <br />
      <hr style={{ border: "none", borderTop: "3px solid #d7b64d",  margin: "2rem auto" }} />
      <Contact />
      </>
  );
}

export default App