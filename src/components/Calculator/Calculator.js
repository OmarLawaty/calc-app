import React, { Component, createRef } from 'react';

import './Calculator.scss';
import Display from '../Display/Display';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: '1',
      activeTheme: ['default', 'light', 'purple'],
      result: '0',
      flag: 0,
      dot: 0
    };
    this.appRef = createRef();
    this.themeChangerRef = createRef();
    this.calcButtons = createRef();
    this.calcResults = createRef();
  }

  themeChanger = e => {
    document.body.classList = '';
    document.body.classList.add(this.state.activeTheme[e.target.value - 1]);
  };

  calcOperations = e => {
    const { result } = this.state;
    const button = e.target.innerHTML;
    if (e.target.classList.contains('button')) {
      if (
        e.target.classList.contains('num') ||
        e.target.classList.contains('operator')
      ) {
        this.setState({
          result: this.checkDisplay(result, button)
        });
      } else if (e.target.classList.contains('del')) {
        return result !== '0'
          ? result.length > 1
            ? this.setState({ result: this.state.result.slice(0, -1) })
            : this.setState({ result: '0' })
          : result;
      } else if (e.target.classList.contains('reset')) {
        this.setState({ result: '0' });
      } else if (e.target.classList.contains('equal')) {
        this.equal(result);
      }
    }
  };

  checkDisplay = (result, button) => {
    if (button === '.' && result === '0')
      // if user 1st enter dot
      return '0.';
    else if (result === '0') {
      // other than dot in 1st enter
      if (button !== '+' && button !== '-' && button !== '/' && button !== '*')
        // numbers
        return button;
      // if operators
      else return '0' + button;
    } else if (result === Infinity) return button;
    else if (result !== '0' && this.state.flag !== 0) {
      // after Enter pressed
      this.setState({ flag: 0 });
      if (button === '.') {
        return '0.';
      } else if (
        button !== '+' &&
        button !== '-' &&
        button !== '/' &&
        button !== '*'
      )
        // number means start a new value
        return button;
      // operator means continue with previous answer
      else return result + button;
    } else if (result !== '0') {
      let temp = result[result.length - 1];
      if (temp === '.' && button === '.')
        // not repeating dot in end
        return result;
      if (
        (temp === '+' || temp === '-' || temp === '/' || temp === '*') &&
        (button === '+' || button === '-' || button === '/' || button === '*')
        // not repeating operators in end
      )
        return result.slice(0, -1) + button;
      else {
        if (button === '.' && this.state.dot === 0) {
          this.setState({ dot: 1 });
          return result + button;
        } else if (
          button === '+' ||
          button === '-' ||
          button === '/' ||
          button === '*'
        ) {
          this.setState({ dot: 0 });
          return result + button;
        } else if (button !== '.') return result + button;
        else return result;
      }
    }
  };

  equal = result => {
    this.setState({ flag: 1 });
    let temp = result[result.length - 1];
    if (temp !== '+' && temp !== '-' && temp !== '/' && temp !== '*')
      // eslint-disable-next-line
      this.setState({ result: eval(result) });
  };

  render() {
    return (
      <div className="calculator">
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
                value={this.state.activeIndex}
                onChange={e => {
                  this.themeChanger(e);
                  this.setState({
                    activeIndex: this.themeChangerRef.current.value
                  });
                }}
                ref={this.themeChangerRef}
              />
            </div>
          </div>
        </header>
        <main>
          <Display value={this.state.result} reference={this.calcResults} />
          <section
            className="Keypad"
            ref={this.calcButtons}
            onClick={e => this.calcOperations(e)}
          >
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
        </main>
      </div>
    );
  }
}

export default Calculator;
