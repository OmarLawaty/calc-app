import React from 'react';

const keypad = ({ reference, action }) => {
  return (
    <section className="Keypad" ref={reference} onClick={e => action(e)}>
      <button className="button num">7</button>
      <button className="button num">8</button>
      <button className="button num">9</button>
      <button className="button del">DEL</button>
      <button className="button num">4</button>
      <button className="button num">5</button>
      <button className="button num">6</button>
      <button className="button operator">+</button>
      <button className="button num">1</button>
      <button className="button num">2</button>
      <button className="button num">3</button>
      <button className="button operator">-</button>
      <button className="button num">.</button>
      <button className="button num">0</button>
      <button className="button operator">/</button>
      <button className="button operator">*</button>
      <button className="button reset">RESET</button>
      <button className="button equal">=</button>
    </section>
  );
};

export default keypad;
