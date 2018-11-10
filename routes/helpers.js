
// Sum all values in an array
function add(a, b) {
  return a + b;
}

// Get index of highest value in an array
function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }
  var max = arr[0];
  var maxIndex = 0;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex + 1;
}

module.exports.add = add
module.exports.indexOfMax = indexOfMax
