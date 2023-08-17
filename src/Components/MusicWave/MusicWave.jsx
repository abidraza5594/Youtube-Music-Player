import React, { useRef, useEffect } from 'react';

import './MusicWave.css';

function MusicWave({ audioContext }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.connect(audioContext.destination);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the music wave visualization using the dataArray
      // Customize this part to create the desired visualization
      
      requestAnimationFrame(draw);
    };

    draw();
  }, [audioContext]);

  return <canvas className="music-wave-canvas" ref={canvasRef} />;
}

export default MusicWave;
