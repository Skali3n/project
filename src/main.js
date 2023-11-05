import express, { json } from 'express';
import config from './config/app.config.js';

import { UsersController, router as usersRouter } from './controllers/users.controller.js';
import UsersService from './services/users.service.js';
import UsersRepository from './repositories/users.repository.js';

// Initialize the controller with the service and repository
new UsersController(new UsersService(new UsersRepository()));
// Same as:
// const usersRepository = new UsersRepository();
// const usersService = new UsersService(usersRepository);
// const usersController = new UsersController(usersService);

const app = express();

app.use(json());
app.use(usersRouter);

app.listen(config.app.port, () => {
  const host = `http://localhost:${config.app.port}`;
  console.log(`Server is running on ${host}`);
});
