class RoleService {
  #roleRepository;

  constructor(roleRepository) {
    this.#roleRepository = roleRepository;
  }

  roles = [
    { userId: 1, roleName: 'admin' },
    { userId: 2, roleName: 'member' },
  ];

  createRole(title) {
    const roleData = {
      title,
    };
    return this.#roleRepository.createRole(roleData);
  }

  getUserRole(userId) {
    const userRoles = this.roles.filter((role) => role.userId === userId).map((role) => role.roleName);
    return userRoles;
  }

  getAllRoles() {
    return this.#roleRepository.selectRoles();
  }
}

export default RoleService;
