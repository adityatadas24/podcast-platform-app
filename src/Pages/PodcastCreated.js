import React, { useState,useEffect } from "react";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import "./style.css";
import Header from "../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../Firebase";
import Button from "../components/Buttons/Button";
import EpisodeDetails from "../components/Podcast/EpidodesDetails/EpisodeDetails";
import AudioFile from "../components/Podcast/AudioFile";
const PodcastCreated = () => {
  const { id } = useParams();
  const [podcastCreated, setPodcastCreated] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile , setPlayingFile] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getData();
      console.log(id);
    }
  }, [id]);

  const getData = async() => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcastCreated({ id: id, ...docSnap.data() });
        toast.success("Podcast Updated");
      } else {
        console.log("No such document!");
        toast.error("No such document!");
        navigate("/podcast");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episode")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodeData);
      },
      (error) => {
        console.log("error fetching episode", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      <Header />
      
      <div className="input-wrapper" style={{ margin: "0rem" }}>
        {podcastCreated.id && (
          <div style={{ width: "85vw" }} className="input-wrapper-2">
            <div
              style={{
                display: "flex",
                justifyConten: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <h1 style={{ textAlign: "left", width: "100%" , fontWeight:'400'}}>
                {podcastCreated.title}
              </h1>
              {podcastCreated.createdBy === auth.currentUser.uid && (
                <Button
                  style={{ width: "30vw" }}
                  text={"Create Episode"}
                  handleSubmit={() => navigate(`/podcast/${id}/create-episode`)}
                />
              )}
            </div>

            <div className="podcast-image-banner">
              <img
                className="banner-image"
                src={podcastCreated.bannerImage}
                alt="bannerImage"
              />
            </div>
            <p className="desc-podcast">{podcastCreated.description}</p>
            <h1 style={{textAlign:'left',fontWeight:'400'}}>Episode</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode,index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      desc={episode.description}
                      audioFile={episode.audioFile}
                      handleSubmit={(file) =>
                        setPlayingFile(file)
                      }
                    />
                  );
                })}
              </>
            ) : (
              <>no episode</>
            )}

          </div>

        )}
     

      </div>
    {playingFile && (<AudioFile audioSrc={playingFile} image={podcastCreated.bannerImage}/>)}

     

    </div>
  );
};

export default PodcastCreated;
