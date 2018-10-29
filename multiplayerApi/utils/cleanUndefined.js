const cleanUndefined = (array) => {
  if(!array) return;
  return array.filter( x => {
    return x;
  });
};

module.exports = cleanUndefined; 