
import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
// import CusTomButtons from '../Buttons/CusTomButtons';

import './MusicPlayer.css';

function MusicPlayer({ playlist, removeMusic,isopenpopup }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const playerRef = useRef(null);

  useEffect(() => {
    setIsPlaying(true); // Autoplay the first track
  }, [currentTrackIndex]);

  const videoOpts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      modestbranding: 1, // Hide YouTube logo
      rel: 0, // Do not show related videos at the end
      controls: 0, // Hide video controls
    },
  };

  const getThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  };

  const playPauseHandler = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrackHandler = () => {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= playlist.length) {
      nextIndex = 0; // Start playing the first song
    }
    setCurrentTrackIndex(nextIndex);
    setError(null); // Clear any previous errors
  };

  const prevTrackHandler = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setError(null); // Clear any previous errors
    }
  };

  const onPlayerReady = event => {
    playerRef.current = event.target;
  };

  const onPlayerStateChange = event => {
    if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
    }
  };

  const onPlayerError = event => {
    setError("Video unavailable");
  };

  return (
    <div className="music-player">

      <div className="thumbnail">
        <img src={getThumbnailUrl(playlist[currentTrackIndex].videoId)} alt="Video Thumbnail" />
        <h2 className='title'>{playlist[currentTrackIndex].title}</h2>
      </div>
    

      <div className="btnContainer">
          <div className="player-controls">
            <button onClick={prevTrackHandler}>Previous</button>
            <button onClick={playPauseHandler}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={nextTrackHandler}>Next</button>
            <button className='addmusic' onClick={() => isopenpopup(true)} ><span>Add Music</span><i></i></button>
          </div>
          <button className="remove-button" onClick={() => removeMusic(currentTrackIndex)}>Remove Music</button>
      </div>

      <div className="videoContainer">
        {error ? (
          <p>{error}</p>
        ) :
          <div className='video'>
            <YouTube videoId={playlist[currentTrackIndex].videoId} opts={videoOpts} onReady={onPlayerReady} onStateChange={onPlayerStateChange} onError={onPlayerError} />
          </div>
        }
      </div>

    </div>
  );
}

export default MusicPlayer;
