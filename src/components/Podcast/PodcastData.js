import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../Firebase";
import { setPodcasts } from "../../slices/PodcastSlice";
import PodcastCard from "./PodcastCard";
import Input from "../Inputs/Input";

const PodcastData = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search , setSearch] = useState('')
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastData));
      },
      (error) => {
        console.log("error fetching podcast", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  var filtedPodcast = podcasts.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="input-wrapper-2">
      <Input
          type="text"
          value={search}
          setState={setSearch}
          placeholder="Search podcast"
          name="name"
          
        />
      {filtedPodcast.length > 0 ? (
        <div className="podcast-flex">
          {filtedPodcast.map((item) => (
              <PodcastCard
              key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayimage}
              />
           
          ))}
        </div>
      ) : (
        <p>{search ? 'Podcast Not found' : 'No podcast on this platform'}</p>
      )}
      </div>
      
    </div>
  );
};

export default PodcastData;
