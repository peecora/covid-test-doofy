import React from 'react';

import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
export const FloatingButton = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <button
      type='button'
      className={`fixed z-90 bottom-10 left-8 w-10 h-10 rounded-full ${
        isDarkMode ? 'light' : 'dark'
      }`}
      onClick={() => {
        toggleDarkMode();
      }}>
      <div className='flex align-items justify-center'>
        {isDarkMode ? <FaLightbulb /> : <FaRegLightbulb />}
      </div>
    </button>
  );
};
