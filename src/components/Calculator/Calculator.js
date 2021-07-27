import React, { Component, createRef } from 'react';

import './Calculator.scss';
import Display from '../Display/Display';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: '1',
      activeTheme: ['default', 'light', 'purple'],
      resultArr: [],
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
    this.appRef.current.classList = 'calculator';
    this.appRef.current.classList.add(
      this.state.activeTheme[e.target.value - 1]
    );
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
          ? result.length > 0
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
      <div className="calculator default" ref={this.appRef}>
        <header>
          <div className="page-logo">calc</div>
          <div className="theme-changer">
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
        </header>
        <main>
          <Display value={this.state.result} reference={this.calcResults} />
          <div
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
          </div>
        </main>
      </div>
    );
  }
}

export default Calculator;
// calcOperations = e => {
//   const splitJoin = temp => {
//     temp = temp.split('');
//     temp.pop();
//     return temp.join('');
//   };
//   if (e.target.classList.contains('del')) {
//     if (this.state.screenNum !== 0) {
//       let temp = this.state.screenNum.toString();
//       console.log(temp);
//       if (temp.length === 1) {
//         this.setState({ screenNum: 0 });
//       }
//       //if no commas or .'s
//       else if (!temp.includes('.') && !temp.includes(',')) {
//         this.setState({ screenNum: splitJoin(temp) });
//       } else if (temp.includes('.')) {
//         this.setState({ screenNum: splitJoin(temp) });
//       } else {
//         temp = splitJoin(temp);
//         temp = temp.toString().replace(/,/g, '');
//         this.setState({ screenNum: parseInt(temp).toLocaleString('en-US') });
//         console.log(temp);
//       }
//     }
//   } else if (e.target.classList.contains('reset')) {
//     this.setState({ resultArr: [], result: '', screenNum: 0 });
//   } else if (e.target.classList.contains('num')) {
//     const keyNum = e.target.innerHTML;

//     console.log(this.state.screenNum);
//     if (this.state.screenNum === 0) {
//       this.setState({ screenNum: keyNum });
//     }

//     //no commas beyond decimal point, so add keyNum to end
//     else if (
//       keyNum === '.' ||
//       this.state.screenNum.toString().includes('.') ||
//       (!this.state.screenNum.toString().includes('.') &&
//         this.state.screenNum.length < 3)
//     ) {
//       this.setState({ screenNum: this.state.screenNum + keyNum });
//       // add commas to integers
//     } else {
//       let temp = this.state.screenNum.toString();
//       temp = temp.replace(/,/g, '');
//       temp += keyNum;
//       this.setState({ screenNum: parseInt(temp).toLocaleString('en-US') });
//     }
//   } else if (e.target.classList.contains('operator')) {
//     let operator = e.target.innerHTML;
//     if (operator === 'x') {
//       operator = '*';
//     }
//     this.state.resultArr.push(this.state.screenNum);
//     this.state.resultArr.push(operator);

//     this.setState({ screenNum: 0 });
//   } else if (e.target.classList.contains('equal')) {
//     this.state.resultArr.push(this.state.screenNum);
//     this.setState({ result: this.state.resultArr.join('') });
//     //evaluate string
//     this.setState({ screenNum: window.eval(this.state.result) });
//     //set solution in the screen window
//     this.calcResults.value = this.state.screenNum;
//     //reset
//     this.setState({ resultArr: [] });
//     this.setState({ result: '' });
//   }
// };
