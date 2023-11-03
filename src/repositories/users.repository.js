const BaseRepository = require("./base.repository");
const UserModel = require("../models/user.model");

class UsersRepository extends BaseRepository {
  constructor() {
    super();
    this._dataFilePath = "../../database/users.json";
    this._initialize();
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

module.exports = UsersRepository;
