import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <div id="home">
        <Hero
          title={
            "Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
          }
          imageUrl={"/hero.png"}
        />
      </div>
      <div id="about">
        <Biography imageUrl={"/about.png"} />
      </div>
      <div id="departments">
        <Departments />
      </div>
      <div id="contact">
        <MessageForm />
      </div>
    </>
  );
};

export default Home;
