/**
 * Para criar um usuário: name, email, senha
 */

// Sempre que precisa definir o formato de um objeto, cria uma interface
interface TechObject {
  title: string;
  experience: number;
}

interface  CreateUserData {
  name?: string, //colocar a interrogação diz que é opcional
  email: string,
  password: string,
  techs: Array<string | TechObject>
}

export default function createUser({ name = '', email, password }: CreateUserData) {
  const user = {
    name,
    email,
    password,
  }

  return user;
}