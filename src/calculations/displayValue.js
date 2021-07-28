import mathOperations from './mathOperations';
import equal from './equal';

const displayValue = (result, { innerHTML: button, classList }) => {
  if (classList.contains('del')) {
    return result === '0'
      ? result
      : result === 'Infinity' || result === 'NaN' || result.length === 1
      ? '0'
      : result.slice(0, -1);
  } else if (classList.contains('reset')) return '0';
  else if (classList.contains('equal')) return equal(result);
  else return mathOperations(result, button, classList);
};

export default displayValue;
