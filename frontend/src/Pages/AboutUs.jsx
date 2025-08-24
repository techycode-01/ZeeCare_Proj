import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <div id="about">
        <Hero
          title={"Learn More About Us | ZeeCare Medical Institute"}
          imageUrl={"/about.png"}
        />
      </div>
      <div id="about-content">
        <Biography imageUrl={"/whoweare.png"} />
      </div>
    </>
  );
};

export default AboutUs;
