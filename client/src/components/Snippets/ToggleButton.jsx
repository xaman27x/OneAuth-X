import React from 'react';

const ToggleButton = ({ isToggled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex ml-10 flex-row items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
        isToggled ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`transform transition-transform inline-block w-5 h-5 bg-white rounded-full ${
          isToggled ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></span>
    </button>
  );
};

export default ToggleButton;
