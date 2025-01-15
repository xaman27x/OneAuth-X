import React from 'react';
import '../../index.css';

const Header = ({ isRoot, onBack }) => {
  return (
    <div className='flex flex-row bg-indigo-950 items-center w-full p-3 justify-center'>
      { !isRoot && (
        <button 
          onClick={onBack} 
          className='absolute left-4 text-gray-200 hover:text-gray-400 focus:outline-none'
        >
          <span className="text-4xl">&#8592;</span>
        </button>
      )}
      <h1 
        className='text-gray-200 text-5xl font-bold animate-none' 
        style={{ fontFamily: "Saira Stencil One" }}
      >
        0neAuthX
      </h1>
    </div>
  );
};

export default Header;
