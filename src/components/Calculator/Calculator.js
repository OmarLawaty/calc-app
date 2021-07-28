import React, { Component, createRef } from 'react';

import { Display, Keypad } from '../Index';
import displayValue from '../../calculations/displayValue';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: '1',
      activeTheme: ['default', 'light', 'purple'],
      result: '0'
    };

    this.calcButtons = createRef();
    this.calcResults = createRef();
  }

  onKeyClick = e => {
    if (e.target.classList.contains('button')) {
      this.setState({
        result: displayValue(this.state.result.toString(), e.target)
      });
    } else return '';
  };

  render() {
    return (
      <main>
        <Display value={this.state.result} reference={this.calcResults} />
        <Keypad action={this.onKeyClick} reference={this.calcButtons} />
      </main>
    );
  }
}

export default Calculator;
