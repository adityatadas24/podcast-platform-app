import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
const AudioFile = ({ audioSrc, image }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  function handleDuration(e) {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  }

  function handleVolume(e) {
    setCurrentTime(e.target.value);
    audioRef.current.volume = e.target.value;
  }
  function togglePlaying() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }

  function toggleMute() {
    if (isMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  }
  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMeteData);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMeteData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMeteData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isMute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);

  const formatTime= (time)=>{
const minutes = Math.floor(time / 60);
const seconds = Math.floor(time % 60);
return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  return (
    <div className="audio-file">
      <img src={image} />
      <audio ref={audioRef} src={audioSrc} />
      <p className="btn" onClick={togglePlaying}>{!isPlaying ? <FaPlay /> : <FaPause />}</p>
      <div className="input-range">
        <p>{formatTime(currentTime)}</p>
        <input
          className="audio-range"
          type="range"
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleDuration}
        />
        <p>-{formatTime(duration - currentTime)}</p>
      </div>
      <div className="input-range">
        <p className="btn" onClick={toggleMute}>{isMute ? <FaVolumeUp /> : <FaVolumeMute />}</p>
        <input
          className="audio-range2"
          type="range"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
};

export default AudioFile;
