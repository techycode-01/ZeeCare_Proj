import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
      description: "Our Pediatrics department provides comprehensive healthcare for infants, children, and adolescents.",
      services: [
        "Childhood Vaccinations",
        "Growth & Development Monitoring",
        "Pediatric Consultations",
        "Adolescent Health"
      ]
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
      description: "Specializing in the diagnosis and treatment of musculoskeletal conditions.",
      services: [
        "Joint Replacement Surgery",
        "Sports Medicine",
        "Spine Surgery",
        "Trauma & Fracture Care"
      ]
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
      description: "We are well-known across South India for handling all types of cardiac emergencies.",
      services: [
        "Coronary Care Department",
        "Heart Failure Clinic",
        "Cardiac Surgeries",
        "Electrophysiology"
      ]
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
      description: "Dedicated to the diagnosis and treatment of disorders of the nervous system.",
      services: [
        "Stroke Management",
        "Epilepsy Treatment",
        "Parkinson's Disease Care",
        "Neuromuscular Disorders"
      ]
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
      description: "Providing advanced cancer care with a multidisciplinary approach.",
      services: [
        "Chemotherapy",
        "Radiation Therapy",
        "Surgical Oncology",
        "Palliative Care"
      ]
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
      description: "Utilizing cutting-edge imaging technology for accurate diagnosis.",
      services: [
        "X-ray & CT Scans",
        "MRI & Ultrasound",
        "Interventional Radiology",
        "Mammography"
      ]
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
      description: "Helping patients regain mobility and reduce pain through rehabilitation.",
      services: [
        "Post-operative Rehab",
        "Sports Injury Rehab",
        "Pain Management",
        "Geriatric Physical Therapy"
      ]
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
      description: "Expert care for skin, hair, and nail conditions.",
      services: [
        "Acne Treatment",
        "Eczema & Psoriasis Management",
        "Skin Cancer Screening",
        "Cosmetic Dermatology"
      ]
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
      description: "Comprehensive care for ear, nose, and throat disorders.",
      services: [
        "Hearing Loss Treatment",
        "Sinusitis Management",
        "Tonsillectomy",
        "Voice Disorders"
      ]
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 3, // Changed from 4
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments">
        <h2>Departments</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
          autoPlay={true}
          autoPlaySpeed={4000}
          infinite={true}
          pauseOnHover={true}
          transitionDuration={800}
          swipeable={true}
          draggable={true}
          showDots={false}
          partialVisible={false}
          centerMode={false}
          rewind={false}
          rewindWithAnimation={true}
          rtl={false}
          shouldResetAutoplay={true}
          slidesToSlide={1}
          additionalTransfrom={0}
          arrows={true}
          focusOnSelect={false}
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="department-card">
                <div className="card-image-container">
                  <img className="card-image" src={depart.imageUrl} alt="Department" />
                </div>
                <div className="card-content">
                  <h2 className="card-title">{depart.name}</h2>
                  <p className="card-description">{depart.description}</p>
                  <ul className="service-list">
                    {depart.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="service-item">
                        <svg className="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="service-text">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;
