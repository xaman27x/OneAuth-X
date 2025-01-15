import React from 'react';
import './Spinner.css'; 

const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-90"></div>
    </div>
    <div className="text-container">
      <div className="font-sans font-bold text-blue-950">Authenticating</div>
    </div>
  </div>
);

export default Spinner;
