import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            At ZeeCare, we are dedicated to providing compassionate and comprehensive healthcare services. Our team of experienced professionals is committed to your well-being, offering personalized care tailored to your needs. We believe in fostering a healthy community through accessible and high-quality medical support.
          </p>
          <p>Established in 2024, ZeeCare has quickly become a trusted name in healthcare.</p>
          <p>Our state-of-the-art facility is equipped with the latest technology to ensure accurate diagnoses and effective treatments.</p>
          <p>
            We strive to create a welcoming and supportive environment for all our patients. From routine check-ups to specialized treatments, your health is our priority. We are constantly innovating to improve our services and provide the best possible patient experience.
          </p>
          <p>Your health, our mission.</p>
          <p>Committed to excellence in healthcare.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
