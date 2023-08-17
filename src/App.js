import React, { useState } from 'react';
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import './App.css';

function App() {
  const [playlist, setPlaylist] = useState([
    { title: 'Juice WRLD Type Beat "FORGET ME" | Sad Guitar Rap Beat | Emotional Guitar instrumental 2023', videoId: 'TH4Y880u3U4' },
    { title: '[FREE] Juice WRLD Type Guitar Hip Hop Beat 2018 - "Ice" | Free Beat | Trap/Rap Instrumental 2019', videoId: 'aqZbswJFC-E' }, 
    { title: '(FREE) Juice WRLD Type Beat - "Imperfect"', videoId: 'NPw98mU-flk' }, 
    { title: '[FREE] Mc Stan Type Beat -"YAADEIN"| Sad Type Beat | Trap Beat |2022|', videoId: 'YrbvYmK23s4' },
    { title: '[FREE] Mc Stan Type Beat', videoId: '--lHWAXuh2Y' },
    // Add more songs here...
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState('');

  const addMusicHandler = () => {
    try {
      // Extract video ID from the YouTube URL
      const urlParts = newUrl.split('=');
      if (urlParts.length !== 2) {
        throw new Error('Invalid YouTube URL');
      }
      const videoId = urlParts[1];

      // Add the new track to the playlist
      setPlaylist(prevPlaylist => [...prevPlaylist, { title: newTitle, videoId }]);
      // Reset input fields and close popup
      setNewTitle('');
      setNewUrl('');
      setError('');
      setIsPopupOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeMusicHandler = (indexToRemove) => {
    setPlaylist(prevPlaylist => prevPlaylist.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="app">
      <h1>My Music Player App</h1>
      <button onClick={() => setIsPopupOpen(true)}>Add Music</button>
      {isPopupOpen && (
        <div className={`popup ${isPopupOpen ? 'visible' : ''}`}>
          <h2>Add Music</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
          />
          <input
            type="text"
            placeholder="YouTube URL"
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
          />
          <p>{error}</p>
          <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
          <button onClick={addMusicHandler}>Add</button>
        </div>
      )}
      {playlist.length === 0 ? (
        <p>No songs available. Please add YouTube links or titles to listen.</p>
      ) : (
        <MusicPlayer playlist={playlist} removeMusic={removeMusicHandler} />
      )}
    </div>
  );
}

export default App;
