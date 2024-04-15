import React from "react";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import Button from "../components/Buttons/Button";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log("my user", user);
  const navigate = useNavigate()
  if(!user){
    return <p>Loading...</p>;
  }

  function logOutBtn() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("LogOut Successfully");
        // navigate('/')
      })
      .catch((error) => {

        console.log(error);
      });
  }
  return (
    <div>
      <Header />
  <div className="input-wrapper" style={{margin:'0rem'}}>
    <div className="profile">
    <h2>Name : <span>{user.name}</span></h2>
      <h2>Email : <span>{user.email}</span></h2>
      <h2>User Id : <span>{user.uid}</span></h2>
      <Button text="LogOut" handleSubmit={logOutBtn} />

    </div>
 
  </div>
    </div>
  );
};

export default Profile;
