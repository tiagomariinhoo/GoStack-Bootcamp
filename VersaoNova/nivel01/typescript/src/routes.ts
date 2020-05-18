import {Request, Response} from 'express';
import createUser from './services/CreateUser';

export function helloWorld(req: Request, res: Response) {
  const user = createUser({
    email: 'Tiago@gmail.com',
    password: '123456',
    techs: ['Node', 'Node2', 'Node3', { title: 'Js', experience: 100 }]
  });

  console.log(user.email);
  
  return res.json({ message: 'Hello world' });
}