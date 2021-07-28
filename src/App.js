import React, { Component, createRef } from 'react';

import { Header, Calculator } from './components/Index';
import './App.scss';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: '1',
      activeTheme: ['default', 'light', 'purple']
    };
    this.themeChangerRef = createRef();
  }

  onHeaderChange = e => {
    this.themeChanger(e);
    this.setState({
      activeIndex: this.themeChangerRef.current.value
    });
  };

  themeChanger = e => {
    document.body.classList = '';
    document.body.classList.add(this.state.activeTheme[e.target.value - 1]);
  };

  render() {
    return (
      <div className="calculator">
        <Header
          action={this.onHeaderChange}
          activeIndex={this.state.activeIndex}
          reference={this.themeChangerRef}
        />
        <Calculator />
      </div>
    );
  }
}

export default App;
