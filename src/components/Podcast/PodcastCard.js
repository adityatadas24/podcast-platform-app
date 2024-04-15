import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const PodcastCard = ({ id, title, displayImage }) => {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="display-podcast">
        <img src={displayImage} className="image" />
        <p className="title-card">{title}</p>
      </div>
    </Link>
  );
};

export default PodcastCard;
