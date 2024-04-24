const arr = [1, 2, 3, 4, 5]
const upArr = arr.map(item => item + 3)
console.log(upArr)

const colors = ['blue', 'green', 'white']
// console.log("main",colors.forEach((item, index) => console.log(colors[index] = item + '!')));

// console.log(Array(20).fill(1).forEach((item, index )=> console.log(item * index)))
const numbers = [-2, -4, -8, -16, -32];

console.log( Array(5).fill("girl", 2)
)

console.log(arr.reduce((acc, cur) => acc + cur, 1));

const items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 },
];

// sort by value
// items.sort((a, b) => a.value - b.value);

// sort by name
items.sort((a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});

console.log(items);

let sourceObject = {name:"neymar",country:{name:"brazil"}};

let sourceObject1 = Object.assign({}, sourceObject);

console.log('sourceObject', sourceObject)
console.log('sourceObject1', sourceObject1)
