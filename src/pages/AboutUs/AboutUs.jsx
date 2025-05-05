import React from "react";
import "./AboutUs.css";
import visionImg from "../../assets/vision.jpg";  // Import your local image
import chooseUsImg from "../../assets/content.jpg";  
import missionImg from "../../assets/mission.jpg";  // New Card Image
import Navbar from "../../components/Navbar/Navbar";

const AboutUs = () => {
  return (
    <div className="aboutuspage">
      <Navbar />
      <div className="about-container">
        <h1 className="about-title">Welcome to SuVerse</h1>
        <p className="subtitle">
          The ultimate entertainment hub, bringing you an immersive universe of content like never before!
          <br></br>We are here for you and only you!!!
        </p>

        <div className="about-cardds">
          {/* Our Vision Card */}
          <div className="cardd">
            <img src={visionImg} alt="Vision" />
            <h2>Our Vision</h2>
            <p>
              To revolutionize digital entertainment by providing high-quality, diverse content tailored to every viewer.
            </p>
          </div>

          {/* Why Choose Us Card */}
          <div className="cardd">
            <img src={chooseUsImg} alt="Why Choose Us" />
            <h2>Why Choose Us?</h2>
            <p>
              With a seamless interface, exclusive content, and personalized recommendations, SuVerse is your go-to entertainment platform.
            </p>
          </div>

          {/* New Mission Card */}
          <div className="cardd">
            <img src={missionImg} alt="Our Mission" />
            <h2>Our Mission</h2>
            <p>
              We aim to create an inclusive platform where stories from around the world can be discovered and enjoyed by all.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="about-footer">© 2025 SuVerse. All Rights Reserved.</footer>
      </div>
    </div>
  );
};

export default AboutUs;
