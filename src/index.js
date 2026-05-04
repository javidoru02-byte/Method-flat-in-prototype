function MyFlat(arr) {
  this.arr = arr || [];
}

MyFlat.prototype.forEach = function (callback) {
  for (let i = 0; i < this.arr.length; i++) {
    if (i in this.arr) {
      callback(this.arr[i], i, this.arr);
    }
  }
};

MyFlat.prototype.concat = function (...args) {
  const result = new MyFlat([]);
  result.arr.push(...this.arr);

  for (const arg of args) {
    if (arg instanceof MyFlat) {
      result.arr.push(...arg.arr);
    } else if (Array.isArray(arg)) {
      result.arr.push(...arg);
    } else {
      result.arr.push(arg);
    }
  }
  return result;
};

MyFlat.prototype.flat = function (depth = 1) {
  const flatten = (current, currentDepth) => {
    const result = new MyFlat([]);

    const wrapper = new MyFlat(current);

    wrapper.forEach((item) => {
      if ((item instanceof MyFlat || Array.isArray(item)) && currentDepth > 0) {
        const nextDepth =
          currentDepth === Infinity ? Infinity : currentDepth - 1;
        const flattened = flatten(
          item instanceof MyFlat ? item.arr : item,
          nextDepth,
        );

        result.arr = result.concat(flattened).arr;
      } else {
        result.arr = result.concat([item]).arr;
      }
    });

    return result;
  };

  return flatten(this.arr, depth).arr;
};

const myArray = [1, 2, " ", 3, [4, 5, [1, 4]], , 2];
const a = new MyFlat(myArray);

console.log("flat(Infinity):", a.flat(Infinity));

console.log("flat(1):", a.flat(1));

console.log("flat(2):", a.flat(2));
