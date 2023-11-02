const path = require('path');
const fs = require('fs');

class Role {
  id;
  title;
  createdAt = new Date();
  updatedAt = new Date();

  constructor() {}

  create = (title) => {
    try {
        const usersFilePath = path.join(__dirname, '..', 'data', 'roles.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        if (!Array.isArray(roles)) {
          roles = [];
        }  
      const roleId = roles.length > 0 ? roles[roles.length - 1].id + 1 : 1;

      const role = {
        id: roleId,
        title,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };

      roles.push(role);
      fs.writeFileSync('./data/roles.json', JSON.stringify(roles), 'utf-8');
    } catch (error) {
      console.error('Error while creating role:', error);
    }
  }
}


module.exports = Role;
