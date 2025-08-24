import React, { useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  const scrollToSection = useCallback((sectionId, maxAttempts = 10) => {
    let attempts = 0;
    
    const attemptScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        return true;
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(attemptScroll, 100);
        return false;
      } else {
        console.log(`Section ${sectionId} not found after ${maxAttempts} attempts`);
        return false;
      }
    };
    
    attemptScroll();
  }, []);

  const handleQuickLink = (path, sectionId = null) => {
    if (location.pathname === path) {
      // If already on the page, scroll to section
      if (sectionId) {
        scrollToSection(sectionId);
      }
    } else {
      // Navigate to the page first, then scroll to section
      navigate(path);
      if (sectionId) {
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 300);
      }
    }
  };

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/logo.png" alt="logo" className="logo-img"/>
          </div>
          <div className="quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a onClick={() => handleQuickLink('/', 'home')}>Home</a></li>
              <li><a onClick={() => handleQuickLink('/appointment', 'appointment-form')}>Appointment</a></li>
              <li><a onClick={() => handleQuickLink('/about', 'about')}>About</a></li>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>999-999-9999</span>
            </div>
            <div>
              <MdEmail />
              <span>zeelab@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Delhi, India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
