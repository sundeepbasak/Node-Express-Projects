//events module

const EventEmitter = require("events");

//create an instance of class
const customEmitter = new EventEmitter();

//there are many methods in the object
//--> on: listen for an event
//--> emit: emit an event

//first listener
customEmitter.on("response", () => {
  console.log("data recieved");
}); //pass in the eventName and callback func(listener)

//second listener: with args
customEmitter.on("response", (name,age) => {
  console.log(`Hello ${name} of age ${age}`);
});

//first listen the events and then emit them
customEmitter.emit("response", 'John', 34); //pass in the eventName


