import React from 'react';
import "../Css/SkillsProgreso.css"

const SkillsProgreso = ({ progress, tecnologia }) => {
  return (
    <div className="progress-bar-container">
      <h3>{tecnologia}</h3>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <span className="progress-text">{progress}%</span>
    </div>
  );
};

export default SkillsProgreso;
