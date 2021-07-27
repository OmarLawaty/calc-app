import React from 'react';

const Display = ({ value, reference }) => {
  return (
    <section className="result">
      <input
        type="text"
        placeholder="0"
        readOnly
        ref={reference}
        value={value}
      />
    </section>
  );
};

export default Display;
