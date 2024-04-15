import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Profile";
import PrivateRoutes from "./components/PrivateRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/UserSlice";
import { useDispatch } from "react-redux";
import { auth, db } from "./Firebase";
import CreateAPodcast from "./Pages/CreateAPodcast";
import Podcast from "./Pages/Podcast";
import PodcastCreated from "./Pages/PodcastCreated";
import CreateEpisode from "./Pages/CreateEpisode";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();

              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: userData.uid,
                  profilePic: userData.profilePic,
                })
              );
            }
          },
          (error) => {
            console.log("error", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
    return () => {
      unsubscribeAuth();
    };
  });
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodcast />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/podcast/:id" element={<PodcastCreated/>} />
            <Route path="/podcast/:id/create-episode" element={<CreateEpisode/>} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
