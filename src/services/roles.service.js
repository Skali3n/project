import { RoleRepository } from '../repositories/index.js';

class RolesService {
  #roleRepository;

  constructor(RoleRepository) {
    this.#roleRepository = RoleRepository;
  }

  createRole(title) {
    const roleData = {
      title,
    };
    return this.#roleRepository.createRole(roleData);
  }

  getUserRole(userId) {
    return this.#roleRepository.getUserRole(userId);
  }

  getAllRoles() {
    return this.#roleRepository.selectRoles();
  }
}

export default RolesService;
