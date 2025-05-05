import React from 'react';
import './TVShows.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_video from '../../assets/hero_video.mp4';  // Add your video file
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        {/* Video Background */}
        <video className="hero-video" autoPlay loop controls>
          <source src={hero_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="hero-caption">
          <img src={hero_title} alt="Hero Title" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern
            Istanbul embarks on a quest to save the city from an immortal enemy.
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="Play Icon" /> Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="Info Icon" /> More Info
            </button>
          </div>
        </div>
      </div>

      <div className="more-cards">
        <TitleCards title={"Popular on SuVerse"}/>
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
