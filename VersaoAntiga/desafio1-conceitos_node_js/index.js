//Documentação do desafio: https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md#desafio-01-conceitos-do-nodejs

const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

/**
 * Middleware global
 */

 function logRequests(req, res, next) {
    console.count("Número de requisições"); //Número de vezes que foi chamada

    return next();
 }

server.use(logRequests)

/**
 * Middleware local
 * utilizado em todas as roas que recebem ID no parâmetro da url
 * verifica se o projeto com aquele ID existe
 * Caso não exista, retorna um erro, caso contrário
 * permite a requisição nromalmente
 */

function checkIndexExists(req, res, next) {
    const {id} = req.params;

    var idx = projects.findIndex(x => x.id == id);

    if(idx == -1) {
        return res.status(400).json({
            error: 'Index fora do array'
        });
    }

    return next();
}

/**
 * Lista todos os usuários e suas tarefas
 */
server.get('/projects', (req, res) => { 
    return res.json(projects);
});

/**
 * Recebe 'id' e 'title' no body e cadastra um novo projeto
 * dentro de um array no seguinte formato
 * { id: '1', 'title': 'Novo Projeto', tasks: []}
 * Enviar tanto o ID quanto  o título com aspas duplas
 */
server.post('/projects', (req, res) => { 
    const {id, title} = req.body
    
    const project = {
        id,
        title,
        tasks: []
    }

    projects.push(project)

    return res.json(projects)
});


/**
 * A rota recebe um campo title e armazena uma nova tarefa no array de tarefas
 * de um projeto específico escolhido através do id presente nos parametros
 */
server.post('/projects/:id/tasks', checkIndexExists, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    for (obj in projects) { //O for em JS é através do index
        if(projects[obj].id == id){
            projects[obj].tasks.push(title);
            break;
        }
    }

    return res.json(projects)
})

/**
 * Deleta o projeto com o id presente nos parametros
 */
server.delete('/projects/:id', checkIndexExists, (req, res) => {
    const {id} = req.params

    var idx = projects.findIndex(x => x.id == id);

    if(idx != -1) {
        projects.splice(idx, 1)
    }

    return res.json(projects)
});

/**
 * Altera o titulo do projeto com o id presente nos parâmetros
 */
server.put('/projects/:id', checkIndexExists, (req, res) => {
    const {id} = req.params;
    const {title} = req.body

    var idx = -1;
    idx = projects.find(x => x.id == id);

    if(idx != undefined){
        idx.title = title;
    }

    return res.json(projects);
})

server.listen(3000);