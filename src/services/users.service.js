class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  createUser(input) {
    console.log("Creating user with input:", input);

    const user = this.usersRepository.createUser(input);

    return {
      fullName: user.fullName,
      email: user.email,
    };
  }

  getUsers() {
    console.log("Getting users");

    const users = this.usersRepository.selectUsers();

    const mappedUsers = users.map((user) => ({
      fullName: user.fullName,
      email: user.email,
    }));

    return {
      items: mappedUsers,
      count: mappedUsers.length,
    };
  }
}

module.exports = UsersService;
