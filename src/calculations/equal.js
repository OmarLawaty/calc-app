const equal = result => {
  let temp = result[result.length - 1];
  if (temp !== '+' && temp !== '-' && temp !== '/' && temp !== '*')
    // eslint-disable-next-line
    return eval(result);
};

export default equal;
