//setTimeout: it runs only once after a particular interval of time, and is async

console.log("first");
setTimeout(() => {
  console.log("second");
}, 0);
console.log("third");
