import React, { useState } from "react";
import Header from "../components/Header/Header";
import PodcastData from "../components/Podcast/PodcastData";

const Podcast = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div >
      <Header />
      {loading ? (
        <div className="load">
          <p className="loader"></p>
        </div>
      ) : (
      <div className="input-wrapper" >
        <div>
          <h1 style={{marginBottom:'60px'}}> Discover Podcast</h1>
          <PodcastData />
        </div>
      </div>)}
    </div>
  );
};

export default Podcast;
