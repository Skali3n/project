const express = require("express");
const config = require("./config/app.config");

const { UsersController, usersRouter } = require("./controllers/users.controller");
const UsersService = require("./services/users.service");
const UsersRepository = require("./repositories/users.repository");

new UsersController(new UsersService(new UsersRepository()));

const app = express();

app.use(express.json());
app.use(usersRouter);

app.listen(config.app.port, () => {
  const host = `http://localhost:${config.app.port}`;
  console.log(`Server is running on ${host}`);
});
