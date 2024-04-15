import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../Inputs/Input";
import PodcastInput from "../Inputs/PodcastInput";
import FileInput from "../Inputs/FileInput";
import Button from "../Buttons/Button";
import { toast } from "react-toastify";
// import { ref } from "firebase/database";
import { getDownloadURL, uploadBytes,ref } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../Firebase";


const CreatePodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const [display, setDisplay] = useState();
  const [banner, setbanner] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function createPodcast() {
    if (title && desc && display && banner) {
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, banner);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, display);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayimage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setbanner(null);
        setDisplay(null);
        toast.success("Podcast Uploaded");
      } catch (e) {
        toast.error(e.message);
        console.log(e);
      }
    } else {
      toast.error("Please enter all values");
    }
  }

  function displayFileInput(file) {
    setDisplay(file);
  }

  function bannerFileInput(file) {
    setbanner(file);
  }
  return (
    <div>
      <PodcastInput
        type="text"
        value={title}
        setState={setTitle}
        placeholder="title"
      />
      <PodcastInput
        type="text"
        value={desc}
        setState={setDesc}
        placeholder="Discription"
      />
  
      <FileInput
        accept={"image/*"}
        id="display-file-input"
        text="Display Image Upload"
        functionInput={displayFileInput}
      />
  
      <FileInput
        accept={"image/*"}
        id="banner-file-input"
        text={"Banner Image Upload"}
        functionInput={bannerFileInput}
        style={{width : '60vw'}}
      />
      
      <Button
        text={loading ? "Loading..." : "Create A Podcast"}
        disabled={loading}
        handleSubmit={createPodcast}
      />
    </div>
  );
};

export default CreatePodcastForm;
