import React, { useState } from "react";
import Header from "../components/Header/Header";
import Input from "../components/Inputs/Input";
import FileInput from "../components/Inputs/FileInput";
import Button from "../components/Buttons/Button";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreateEpisode = () => {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()
  function handleFileAudio(file) {
    setAudioFile(file);
  }

  async function createPodcastEpisode() {
    setLoading(true);
    if ((title,desc, audioFile,id)) {
      try {
        const audioRef = ref(
          storage,
          `podcasts-episode/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
  
        const audioUrl = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: desc,
          audioFile : audioUrl,
          createdBy: auth.currentUser.uid,
        };
        await addDoc(collection(db, "podcasts" , id, 'episode'), episodeData);
        setTitle("");
        setDesc("");
        setAudioFile('')
        toast.success("Episode Uploaded successfully");
        navigate(`/podcast/${id}`)
        setLoading(false)
      } catch (e) {
        console.log(e.message);
        setLoading(false)
      }
    } else {
      toast.error("All fields should be mandatory");
      setLoading(false)
    }
   
  }
  return (
    <div>
      <Header />
      <div className="input-wrapper">
       
        <div>
        <h1>Create Episode</h1>
          <Input
            type="text"
            value={title}
            setState={setTitle}
            placeholder="Full Name"
            name="name"
            required={true}
          />
          <Input
            type="email"
            value={desc}
            setState={setDesc}
            placeholder="Email"
            name="email"
            required={true}
          />
          <FileInput
            accept="audio/*"
            id="audio-file"
            text="Upload Audio File"
            functionInput={handleFileAudio}
          />
          <Button
            text={loading ? "Loading..." : "Create Episode"}
            disabled={loading}
            handleSubmit={createPodcastEpisode}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateEpisode;
