function myFlat(arr) {
  this.arr = arr;
}

myFlat.prototype.flats = function (iteretionCount = 1) {
  let result = this.arr;
  for (let i = 0; i < iteretionCount; i++) {
    let tempArrey = [];

    result.forEach((element) => {
      if (Array.isArray(element)) {
        tempArrey = tempArrey.concat(element);
      } else {
        tempArrey.push(element);
      }
    });
    result = tempArrey;
  }
  return (result = result.filter(
    (element) => element != "" && element != " " && element != "    ",
  ));
};

const myArrey = [1, 2, "    ", 3, [4, 5, [1, 4]]];
const a = new myFlat(myArrey);
console.log(a.flats(2));
