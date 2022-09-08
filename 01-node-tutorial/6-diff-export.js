//Different ways of exporting

//**Single exports:
//#1
const user1 = "Sheldon";
const user2 = "Leonard";
module.exports = { user1, user2 }; //used when we have just one export, can be used only once for a file(module)

//#2
const greet = (name) => {
  console.log(`Hi ${name}`);
};
module.exports = greet; //used when we have just one export


//**Multiple exports:
//#3
module.exports.fruits = ["mango", "apple", "orange"];

//#4
const person = {
  name: "Bruce",
  age: "22",
};
module.exports.singlePerson = person;
