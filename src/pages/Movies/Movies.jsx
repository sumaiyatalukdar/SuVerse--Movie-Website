import React from 'react';
import './Movies.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';


const Home = () => {
  
  return (
    <div className='home'>
        <Navbar />
    
      <div className="more-cards">
        <TitleCards title={"Rugged and Outdoorsy"}/>
        <TitleCards title={"Blockbuster Movies"}  category={"top_rated"} />
        <TitleCards title={"Only on SuVerse"}  category={"popular"}/>
        <TitleCards title={"Top picks for you"}  category={"upcoming"}/>
        <TitleCards title={"Upcoming"}  category={"now_playing"}/>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
