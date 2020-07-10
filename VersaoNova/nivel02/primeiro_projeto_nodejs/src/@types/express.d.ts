declare namespace Express { //para sobrescrever uma tipagem do express
  export interface Request {
    user: {
      id: string;
    }
  }
}
