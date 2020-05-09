const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateId(req, res, next) {
  const {id} = req.params;
  if(!isUuid(id)) {
    return res.status(400).json({error: "Invalid Id"});
  }

  return next();
}

// app.use(validateId);

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  console.log("Repository", repository);

  repositories.push(repository);

  return res.status(200).json(repository)
});

app.put("/repositories/:id", (req, res) => {
  const {title, url, techs} = req.body;

  const index = repositories.findIndex(repository => repository.id == req.params.id)

  if(index < 0) {
    return res.status(400).json({
      error: "Repository does not exists"
    });
  }

  if(title) repositories[index].title = title
  if(url) repositories[index].url = url
  if(techs) repositories[index].techs = techs
  
  return res.status(200).json(repositories[index])
});

app.delete("/repositories/:id", (req, res) => {
  const index = repositories.findIndex(repository => repository.id == req.params.id)

  if(index < 0) {
    console.log("Id atual", req.params.id);
    return res.status(400).json({
      error: "Repository does not exists"
    })
  }

  repositories.splice(index, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const index = repositories.findIndex(repository => repository.id == req.params.id)

  if(index < 0) {
    return res.status(400).json({
      error: "Repository does not exists"
    })
  }

  repositories[index].likes += 1;

  return res.status(200).json(repositories[index]);
});

module.exports = app;
