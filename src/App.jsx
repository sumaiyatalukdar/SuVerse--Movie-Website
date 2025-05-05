import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import OurPlans from "./pages/OurPlans/OurPlans"; // Import the OurPlans page
import ContactUs from "./pages/ContactUs/ContactUs"; // Import the Contact Us page
import TVShows from "./pages/TVShows/TVShows";
import Movies from "./pages/Movies/Movies";
import AboutUs from "./pages/AboutUs/AboutUs";
import Theatres from "./pages/Theatres/Theatres";



import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        navigate("/");
      } else {
        console.log("Logged Out");
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/our-plans" element={<OurPlans />} /> {/* Route for Our Plans */}
        <Route path="/contact-us" element={<ContactUs />} /> {/* Route for Contact Us */}
        <Route path="/TVShows" element={<TVShows />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/AboutUs" element={<AboutUs/>}/>
        <Route path="/theatres" element={<Theatres />} />

      </Routes>
    </div>
  );
};

export default App;
