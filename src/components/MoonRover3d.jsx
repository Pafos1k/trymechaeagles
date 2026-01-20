import React, { useEffect } from 'react';
import './MoonRover3d.css';

const MoonRover3D = () => {
  useEffect(() => {
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="moon-rover-container">
      <model-viewer
        className="moon-rover-viewer"
        src="/moon-rover.glb"
        alt="Moon Rover"
        camera-controls
        auto-rotate
        rotation-per-second="15deg"
        exposure="1.05"
        environment-image="neutral"
        shadow-intensity="0"
      />
    </div>
  );
};

export default MoonRover3D;