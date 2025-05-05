import React from "react";
import "./OurPlans.css"; // Ensure this file has the updated styles
import logo from '../../assets/logo.png';
import Navbar from "../../components/Navbar/Navbar";
import backgroundImg from '../../assets/background_banner.jpg';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const OurPlans = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className="plans-container"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Semi-transparent dark screen */}
      <div className="dark-overlay"></div>

      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => {
          navigate(-2);
        }}
      />
      <h1>Choose Your Plan</h1>
      <p>Enjoy unlimited movies, TV shows, and more.</p>

      <div className="plans">
        <div className="plan">
          <h2>Basic</h2>
          <p>₹199/month</p>
          <ul>
            <li>1 screen</li>
            <li>HD available</li>
            <li>Cancel anytime</li>
          </ul>
          <button>Subscribe</button>
        </div>

        <div className="plan">
          <h2>Standard</h2>
          <p>₹499/month</p>
          <ul>
            <li>2 screens</li>
            <li>Full HD</li>
            <li>Cancel anytime</li>
          </ul>
          <button>Subscribe</button>
        </div>

        <div className="plan">
          <h2>Premium</h2>
          <p>₹649/month</p>
          <ul>
            <li>4 screens</li>
            <li>Ultra HD</li>
            <li>Cancel anytime</li>
          </ul>
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default OurPlans;
