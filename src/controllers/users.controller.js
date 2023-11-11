import { Router } from 'express';
import { validateUser } from '../dto/index.js';

export const router = Router();

export class UsersController {
  #usersService;

  constructor(usersService) {
    this.#usersService = usersService;

    router.post('/', validateUser, this.postUser.bind(this));
    router.get('/', this.getUsers.bind(this));
  }

  async postUser(req, res, next) {
    try {
      const input = req.body;
      const user = this.#usersService.createUser(input);

      res.status(201).json(user);
    } catch (err) {
      res.status(err.status || err.statusCode || err.response?.code || 500).json({ message: err.message });

      next(err);
    }
  }

  async getUsers(_, res, next) {
    try {
      const users = this.#usersService.getUsers();

      res.status(200).json(users);
    } catch (err) {
      res.status(err.status || err.statusCode || err.response?.code || 500).json({ message: err.message });

      next(err);
    }
  }
}
