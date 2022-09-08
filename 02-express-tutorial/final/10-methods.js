const express = require("express");
const app = express();
const { people } = require("../data");

//built-in middlewares
app.use(express.static("../methods-public")); //to serve static assets
app.use(express.urlencoded({ extended: false })); //to parse form data
app.use(express.json()); //to parse json data

//post - index.html form data
app.post("/login", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(401).send("Please provide the credentials");
  }
  res.status(200).send(`Welcome ${name}`);
});

//get all data
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

//post - javascript.html form data
app.post("/api/people", (req, res) => {
  //   console.log(req.body);
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: "false", message: "Please provide name value" });
  }
  res.status(200).json({ success: true, person: name });
});

app.post("/api/people/all", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: "false", message: "Please provide name value" });
  }
  res.status(200).json({ success: true, data: [...people, name] });
});

//put method: update data of a particular person
app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(401)
      .json({ success: false, message: "No such person exist" });
  }

  const newPeople = people.map((curPerson) => {
    if (curPerson.id === Number(id)) {
      curPerson.name = name;
    }
    return curPerson;
  });
  res.status(200).json({ success: true, data: newPeople });
});

//delete method:
app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    res.status(401).json({ success: false, message: "No such person exist" });
  }

  const newPeople = people.filter((curPerson) => curPerson.id !== Number(id));
  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});

/* //HTTP Methods:
GET --> read data
POST --> insert data
PUT --> update data
DELETE --> delete data
*/
