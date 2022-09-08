let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  //console.log(req.body);
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: "false", message: "Please provide name value" });
  }
  res.status(200).json({ success: true, person: name });
};

const createPersonAll = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: "false", message: "Please provide name value" });
  }
  res.status(200).json({ success: true, data: [...people, name] });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    res.status(401).json({ success: false, message: "No such person exist" });
  }

  const newPeople = people.filter((curPerson) => curPerson.id !== Number(id));
  return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  createPersonAll,
  updatePerson,
  deletePerson,
};
