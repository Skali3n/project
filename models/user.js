const fs = require('fs');

class User {
  id;
  firstName;
  lastName;
  email;
  password;
  roleId;
  createdAt = new Date();
  updatedAt = new Date();

  constructor() {}

  create = (firstName, lastName, email, password, roleId) => {
    try {
      const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
      const userId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

      const user = {
        id: userId,
        firstName,
        lastName,
        email,
        password,
        roleId,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };

      users.push(user);
      fs.writeFileSync('./users.json', JSON.stringify(users), 'utf8');

      return user;
    } catch (error) {
      console.error('Error while creating user:', error);
      return null;
    }
  };

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get role() {
    const roles = JSON.parse(fs.readFileSync('./roles.json', 'utf8'));

    return roles.find((role) => role.id === this.roleId);
  }
}

module.exports = User;
