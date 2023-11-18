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

  getUserRole(roleId) {
    const roles = this.selectRoles();
    const userRoles = roles.filter((role) => role.roleId === roleId).map((role) => role.title);
    return userRoles;
  }
}

export default RoleRepository;
