// const buffer = Buffer.from([0x1,0x2,0x3,0x4,0x5]);
// const json = JSON.stringify(buffer);
// console.log(json);

// const copy = JSON.parse(json, (key, value) => {
//     return value && value.type === 'Buffer' ?
//       Buffer.from(value.data) :
//       value;
//   });

// console.log(copy);

var number = 128;
console.log(number.toString(16));