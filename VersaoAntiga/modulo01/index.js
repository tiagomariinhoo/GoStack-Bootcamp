const express = require('express');

//Como iniciar a aplicação:
const server = express();

server.use(express.json()) //Entende que o body já vem em Json

//localhost:3000/teste

/**
 * 3 tipos de parâmetros:
 * Query params = ?teste=1
 * Route params = /users/1
 * Request body = { "name": "Tiago", "email"... }
 * `
 * 
 * Debugando utilizando o breakpoint
 */ 

 const users = ['Diego', 'Tiago', 'Victor']

 /**
  * Middleware global
  */

  server.use((req, res, next) => { //Não importa a rota que for chamada na aplicação, isso sempre vai ser chamado
    // console.log('A requisição foi chamada!'); 
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`); //Middleware de log da aplicação

    // Para continuar executando
    // return next();
    next();

    // console.log('Finalizou!')
    console.timeEnd('Request')
  })

server.get('/users', (req, res) => {
    return res.json(users)
})

function checkIndexExists(req, res, next) {
    const user = users[req.params.index];

    if(req.params.index > users.length){
        return res.status(400).json({error: 'Index fora do array'})
    } 

    req.user = user; //Pode dar req.user nos métodos das rotas que tem acesso ao
    //que foi alterado aqui

    return next()
}

server.get('/users/:index', checkIndexExists, (req, res) => {
    //Req são todos os dados da requisição
    //Res para retornar uma resposta ao cliente
    // return res.send('Hello World')

    //Req.query é para buscar os valores que estão dentro do query params
    // const nome = req.query.nome;

    // const id = req.params.id; //Também pode fazer {id} = req.params, no formato de desestruturação

    const {index} = req.params

    // return res.json({ message: `Hello ${nome}`});
    // return res.json({message: `Buscando o usuário ${id}`})
    return res.json(users[index])

}); //Primeira rota do servidor

function checkUserExists(req, res, next) { //middleware local
    if(!req.body.name) { //Se não encontrar informação do usuário
        return res.status(400).json({error: 'User name is required'}) //Retorna um erro para o usuário
    }

    //Se tiver tudo certinho, ele continua
    return next();
}

//CheckUserExists é um middleware local
server.post('/users', checkUserExists, (req, res) => { //Para criar um usuário, as informações vêm no body
    const {name} = req.body

    users.push(name);

    return res.json(users);
});
//CheckUserExists é um middleware local
server.put('/users/:index', checkUserExists, checkIndexExists, (req, res) => { //Index do usuário que quer editar
    const {name} = req.body;
    const {index} = req.params;

    users[index] = name

    return res.json(users)
});

server.delete('/users/:index', checkIndexExists, (req, res) => {
    const {index} = req.params;
    users.splice(index, 1) //Corta uma posição

    // return res.json(users)
    return res.send()
});

server.listen(3000); //O servidor precisa ouvir alguma porta