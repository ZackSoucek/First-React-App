const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
    res.status(404).send("Resource not found.");
  else {
    users["users_list"] = users["users_list"].filter(
      (user) => user["id"] !== id
    );
    res.status(200).send("Success");
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
    res.status(404).send("Resource not found.");
  else {
    result = { users_list: result };
    res.send(result);
  }
});

function findUserById(id) {
  return users["users_list"].find((user) => user["id"] === id); // or line below
  //return users['users_list'].filter( (user) => user['id'] === id);
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined || job != undefined) {
    let result = [];
    if (name != undefined) {
      result.push(findUserByName(name));
    }
    if (job != undefined) {
      result.push(findUserByJob(job));
    }
    result = { users_list: result };
    res.send(result);
  }
  if (name === undefined && job === undefined) {
    res.send(users);
  }
});
const findUserByJob = (job) => {
  return users["users_list"].filter((user) => user["job"] === job);
};
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId();
  addUser(userToAdd);
  res.status(201).end();
});

function addUser(user) {
  users["users_list"].push(user);
}
function generateId(){
  id = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,6);
  while(findUserById(id)){
    id = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,6);
  }
  return id;
}

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};
