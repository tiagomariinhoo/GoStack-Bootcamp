const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json())

// Guarda na memória da aplicação
const projects = [];

function logRequests(req, res, next) {
  const {method, url} = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  next();
}

// app.use(logRequests)

function validateProjectId(req, res, next) {
  const { id } = req.params
  if(!isUuid(id)) {
    return res.status(400).json({error: "Invalid Id"});
  }

  return next();
}


app.get('/projects', (req, res) => {

  const {title} = req.query;

  const results = title 
  ? projects.filter(project => project.title.includes(title))
  : projects;

  console.log("Title: ", title);
  console.log(results)
  return res.json(results)
});

app.post('/projects', (req, res) => {
  const {title, owner} = req.body;

  const project = {id: uuid(), title, owner};

  projects.push(project)

  return res.json(project)
});

// app.use(validateProjectId)
app.use('/projects/:id', validateProjectId) // Utiliza apenas nas rotas que começam com isso

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectIndex = projects.findIndex(project => project.id == id) 
  
  if(projectIndex < 0) {
    return res.status(400).json({error: 'Project does not exists'});
  }

  const project = {
    id,
    title,
    owner,
  }

  projects[projectIndex] = project;

  return res.json(project);
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params

  const { title, owner } = req.body;

  const projectIndex = projects.findIndex(project => project.id == id) 
  
  if(projectIndex < 0) {
    return res.status(400).json({error: 'Project does not exists'});
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(3333, () => {
  console.log('Back-end started!');
});