import React from "react";
import "./Snowfall.css";

const Snowfall = () => {
  return (
    <div className="snowfall-container">
      {/* Generate multiple snowflakes */}
      {[...Array(1000)].map((_, index) => (
        <div
          className="snowflake"
          key={index}
          style={{
            animationDelay: `${Math.random() * 5}s`, // Add random delays for variation
            width: `${Math.random() * 5}px`, // Add random sizes for variation
            height: `${Math.random() * 5}px`, // Add random sizes for variation
            left: `${Math.random() * 100}%`, // Random horizontal position
          }}
        ></div>
      ))}
    </div>
  );
};

export default Snowfall;
