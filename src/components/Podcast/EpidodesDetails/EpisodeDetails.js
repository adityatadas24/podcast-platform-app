import React from "react";
import Button from "../../Buttons/Button";

const EpisodeDetails = ({ index, title, desc, audioFile, handleSubmit }) => {
  return (
    <div style={{textAlign:'left' , marginLeft:'5rem'}}>
      <h2 style={{fontWeight:'500',marginTop:'0rem'}}>
        {index}. {title}
      </h2>
      <p style={{color:'#8f8797'}}>{desc}</p>
      <div>
      <Button style={{width:'20vw'}} text="play" handleSubmit={() => handleSubmit(audioFile)} />

      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default EpisodeDetails;
