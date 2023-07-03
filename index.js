import React, { useState } from 'react';
import CustomNav from '../CustomNav';
import { userData } from '../../helpers';
import image from './Spotify_Logo_CMYK_Green.png';
import './index.css';


const Home = () => {
  const [searchedArtist, setSearchedArtist] = useState(false);

  const handleSearch = () => {
    setSearchedArtist(true);
  };

  return (
    <div>
      <CustomNav onSearch={handleSearch} />
      <div className="home">
      <div className="centered-image">
      <img src={image} alt="Your Image" className="fullscreen-image" />
      </div>
      </div>
    </div>
  );
};

export default Home;
