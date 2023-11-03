const fs = require('fs');

class Role {
  id;
  title;
  createdAt = new Date();
  updatedAt = new Date();

  constructor() {}

  create = (title) => {
    try {
      const roles = JSON.parse(fs.readFileSync('./roles.json', 'utf8'));
      const roleId = roles.length > 0 ? roles[roles.length - 1].id + 1 : 1;

      const role = {
        id: roleId,
        title,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };

      roles.push(role);
      fs.writeFileSync('./roles.json', JSON.stringify(roles), 'utf8');
    } catch (error) {
      console.error('Error while creating role:', error);
    }
  };
}

module.exports = Role;