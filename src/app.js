const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repository = {
    id: uuid(),
    title,
    url,
    techs: techs,
    likes: 0
  }
  repositories.push(repository);

  response.send(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id);
  if (repositoryId < 0){
    return response.status(400).send({error: 'Id não encontrado'});
  }

  const oldRepository = repositories.find(repository => repository.id === id);
  console.log(repositoryId);

  repository = {
    id,
    title,
    url,
    techs,
    likes: oldRepository.likes
  }
  repositories[repositoryId] = repository;

  response.send(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id);
  if (repositoryId < 0){
    return response.status(400).send({error: 'Id não encontrado'});
  }
  
  repositories.splice(repositoryId,1)

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id);
  if (repositoryId < 0){
    return response.status(400).send({error: 'Id não encontrado'});
  }

  const repository = repositories.find(repository => repository.id === id);

  repository.likes++;  
  repositories[repositoryId] = repository;

  response.send(repository);

});

module.exports = app;
