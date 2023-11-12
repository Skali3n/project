import RoleService from './roles.service.js';

class UsersService {
  #usersRepository;
  #roleService;

  constructor(usersRepository, roleService) {
    this.#usersRepository = usersRepository;
    this.#roleService = roleService;
  }

  createUser(input) {
    console.log('Creating user with input:', input);

    const user = this.#usersRepository.createUser(input);

    if (typeof this.#roleService.getUserRoles === 'function') {
      const userRoles = this.#roleService.getUserRoles(user.id);

      return {
        fullName: user.fullName,
        email: user.email,
        roles: userRoles,
      };
    } else {
      console.error('getUserRoles method is not defined in RoleService');
      return {
        fullName: user.fullName,
        email: user.email,
        roles: [],
      };
    }
  }

  getUsers() {
    console.log('Getting users');

    const users = this.#usersRepository.selectUsers();

    const mappedUsers = users.map((user) => ({
      fullName: user.fullName,
      email: user.email,
      roles: this.#roleService.getUserRoles(user.id),
    }));

    return {
      items: mappedUsers,
      count: mappedUsers.length,
    };
  }
}

export default UsersService;
