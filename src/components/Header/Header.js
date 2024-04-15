import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./style.css";
const Header = () => {
  const location = useLocation();
  const currentpath = location.pathname;
  console.log(location.pathname); 

  return (
    <div className="navbar">
      <div className="gradient"></div>
        <div className="links">
          <Link to="/" className={currentpath === "/" ? "active" : ""}>
            SignUp
          </Link>
          <Link
            to="/podcast"
            className={currentpath === "/podcast" ? "active" : ""}
          >
            Podcasts
          </Link>
          <Link
            to="/create-a-podcast"
            className={currentpath === "/create-a-podcast" ? "active" : ""}
          >
            Start A Podcast
          </Link>
          <Link
            to="/profile" 
            className={currentpath === "/profile" ? "active" : ""}
          >
            Profile
          </Link>
        </div>
     
    </div>
  );
};

export default Header;
