import * as RolesService from './roles.service.js';

class UsersService {
  #usersRepository;
  #rolesService;

  constructor(usersRepository, RolesService) {
    this.#usersRepository = usersRepository;
    this.#rolesService = RolesService;
  }

  createUser(input) {
    console.log('Creating user with input:', input);

    const user = this.#usersRepository.createUser(input);

    if (typeof this.#rolesService.getUserRoles === 'function') {
      const userRoles = this.#rolesService.getUserRoles(user.id);

      return {
        fullName: user.fullName,
        email: user.email,
        roles: userRoles,
      };
    }
  }

  getUsers() {
    console.log('Getting users');

    const users = this.#usersRepository.selectUsers();

    const mappedUsers = users.map((user) => ({
      fullName: user.fullName,
      email: user.email,
      roles: this.#rolesService.getUserRole(user.roleId),
    }));

    return {
      items: mappedUsers,
      count: mappedUsers.length,
    };
  }
}

export default UsersService;
