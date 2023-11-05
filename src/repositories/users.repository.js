import BaseRepository from './base.repository.js';
import { UserModel } from '../models/index.js';

class UsersRepository extends BaseRepository {
  constructor() {
    super('../../database/users.json');
  }

  createUser(input) {
    const user = new UserModel(input);

    this._saveData(user);

    return user;
  }

  selectUsers() {
    const users = this._fetchData();

    return users.map((user) => new UserModel(user));
  }
}

export default UsersRepository;
