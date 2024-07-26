import React from 'react';

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative flex items-center">
      {children}
      <div className="tooltip-text absolute bg-black text-white text-center rounded-lg py-2 px-3 invisible opacity-0 transition-opacity duration-300">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
