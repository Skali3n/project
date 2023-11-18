import express, { json } from 'express';
import config from './config/app.config.js';

import { UsersController, usersRouter } from './controllers/index.js';
import { UsersService } from './services/index.js';
import { RoleRepository, UsersRepository } from './repositories/index.js';
import RolesService from './services/roles.service.js';

new UsersController(new UsersService(new UsersRepository(), new RolesService(new RoleRepository())));

const app = express();

app.use(json());
app.use(usersRouter);

app.listen(config.app.port, () => {
  const host = `http://localhost:${config.app.port}`;
  console.log(`Server is running on ${host}`);
});
