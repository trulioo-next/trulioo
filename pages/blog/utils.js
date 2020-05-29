export const calcPageOffset = (parameters) => {
  var { page, baseOffset = 0, offsetBy = 5 } = parameters;
  return (page - 1) * offsetBy || baseOffset;
};
