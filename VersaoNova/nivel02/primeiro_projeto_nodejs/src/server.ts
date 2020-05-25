import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
// O routes nesse caso se torna um middleware
app.use(routes);

app.listen(3333, () => {
  console.log("Server started");
})
