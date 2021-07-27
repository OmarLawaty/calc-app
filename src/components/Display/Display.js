import React from 'react';
import './Display.scss';

const Display = ({ value, reference }) => {
  return (
    <div className="result">
      <input
        type="text"
        placeholder="0"
        readOnly
        ref={reference}
        value={value}
      />
    </div>
  );
};

export default Display;
