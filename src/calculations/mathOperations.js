const mathOperations = (result, button, buttonName) => {
  let dot = 0;

  if (result === 'Infinity' || result === 'NaN') return button;
  else if (
    result === '0' &&
    (buttonName.contains('operator') || button === '.')
  )
    return '0' + button;

  if (result !== '0') {
    let temp = result[result.length - 1];

    if (temp === '.' && button === '.') return result;
    if (buttonName.contains('operator')) {
      if (temp === '+' || temp === '-' || temp === '/' || temp === '*')
        return result.slice(0, -1) + button;

      dot = 0;
      return result + button;
    }

    if (button === '.' && dot === 0) {
      dot = 1;
      return result + button;
    } else if (button !== '.') return result + button;
    else return result;
  }
  return button;
};

export default mathOperations;
