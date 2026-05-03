function MyFlat(arr) {
  this.arr = arr;
}

MyFlat.prototype.flats = function (depth = 1) {
  function flatten(arr, depth) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      if (i in arr === false) continue;

      if (Array.isArray(arr[i]) && depth > 0) {
        result.push(...flatten(arr[i], depth - 1));
      } else {
        result.push(arr[i]);
      }
    }

    return result;
  }

  return flatten(this.arr, depth);
};

const myArray = [1, 2, "    ", 3, [4, 5, [1, 4]]];
const a = new MyFlat(myArray);

console.log(a.flats(Infinity));
