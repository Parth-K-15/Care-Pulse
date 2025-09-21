import React from "react";
import "./Preloader.css"; // We'll put all your CSS here

const Preloader = () => {
  return (
    <div className="preloader">
      <svg viewBox="0 0 100 90">
        <defs>
          <radialGradient id="heartGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF85B3" stopOpacity="1" />
            <stop offset="100%" stopColor="#CF206E" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Heart */}
        <path
          d="M50 75 C5 50, 20 10, 50 25 C80 10, 95 50, 50 75Z"
          stroke="#CF206E"
          strokeWidth="3"
          fill="url(#heartGradient)"
          className="heartbeat"
        />

        {/* ECG Line */}
        <path
          className="ecg"
          d="M30 45 L35 45 L37 38 L40 52 L43 45 L50 45 L52 38 L55 52 L60 45 L65 45"
        />
      </svg>
      <h1>CARE PULSE</h1>
    </div>
  );
};

export default Preloader;
