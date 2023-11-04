import { Router } from 'express';
import validateUser from '../dto/user-create.dto.js';

export const router = Router();

export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;

    router.post('/', validateUser, this.postUser);
    router.get('/', this.getUsers);
  }

  postUser = async (req, res, next) => {
    try {
      const input = req.body;
      const user = await this.usersService.createUser(input);

      res.status(201).json(user);
    } catch (err) {
      res.status(err.status || err.statusCode || err.response?.code || 500).json({ message: err.message });

      next(err);
    }
  };

  getUsers = async (req, res, next) => {
    try {
      const users = await this.usersService.getUsers();

      res.status(200).json(users);
    } catch (err) {
      res.status(err.status || err.statusCode || err.response?.code || 500).json({ message: err.message });

      next(err);
    }
  };
}