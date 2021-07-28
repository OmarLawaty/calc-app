import React from 'react';

const Header = ({ action, activeIndex, reference }) => (
  <header>
    <div className="page-logo">calc</div>
    <div className="theme-changer">
      <div className="theme-number">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div className="theme-selector">
        <label htmlFor="theme">THEME</label>
        <input
          type="range"
          name="active-theme"
          id="theme"
          step="1"
          min="1"
          max="3"
          value={activeIndex}
          onChange={e => {
            action(e);
          }}
          ref={reference}
        />
      </div>
    </div>
  </header>
);

export default Header;
