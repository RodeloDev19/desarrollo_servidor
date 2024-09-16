import express from 'express';
import { roles } from './middleware/rolesMiddleware';
import * as controller from './controllers/userController';

const app = express();
const port = 3000;

app.get('/usuarios', roles(['admin', 'gerente']), controller.listAll);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});