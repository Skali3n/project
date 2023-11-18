import BaseRepository from './base.repository.js';
import { RoleModel } from '../models/index.js';

class RoleRepository extends BaseRepository {
  constructor() {
    super('../../database/roles.json');
  }

  createRole(input) {
    const role = new RoleModel(input);

    this._saveData(role);

    return role;
  }

  selectRoles() {
    const roles = this._fetchData();

    return roles.map((role) => new RoleModel(role));
  }

  getUserRole(userId) {
    const roles = this._fetchData();
    const userRoles = roles.filter((role) => role.userId === userId).map((role) => role.roleName);
    return userRoles;
  }
}

export default RoleRepository;
