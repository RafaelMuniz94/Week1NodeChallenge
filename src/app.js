const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  
  let { title, url, techs } = request.body;
  let repo = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  let {id} = request.params
  let { title, url, techs } = request.body;

  let index = repositories.findIndex(repository => {
    return repository.id  === id
  })

  if( index < 0 ){
    return response.status(400).json({error: "Repository not found!"})
  }

  let repo = repositories[index]

  repo.title = title ? title : repo.title
  repo.url = url ? url : repo.url
  repo.techs = techs ? techs : repo.techs

  repositories[index] = repo

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  let {id} = request.params

  let index = repositories.findIndex(repository => {
    return repository.id  === id
  })

  if( index < 0 ){
    return response.status(400).json({error: "Repository not found!"})
  }

  repositories.splice(index,1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  let {id} = request.params

  let index = repositories.findIndex(repository => {
    return repository.id  === id
  })

  if( index < 0 ){
    return response.status(400).json({error: "Repository not found!"})
  }

  repositories[index].likes ++;

  return response.json(repositories[index]);

});

module.exports = app;
