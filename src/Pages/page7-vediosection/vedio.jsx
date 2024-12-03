import React from "react";
import { FaPlay } from "react-icons/fa";

const VimeoVideo = () => {
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "56.25%" /* 16:9 aspect ratio */
      }}
    >
      <iframe
        src="https://player.vimeo.com/video/317995510?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1#t="
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none"
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo Video"
      ></iframe>
      <div className="video-icon">
        <FaPlay className="play-btn"/>
        <div className="animation-circle"></div>
      </div>
    </div>
  );
};

export default VimeoVideo;
