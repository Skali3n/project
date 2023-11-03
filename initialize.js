const fs = require('fs');
const Role = require('./models/Role');
const initialize = () => {
  try {
    if (!fs.existsSync('./roles.json')) {
      fs.writeFileSync('./roles.json', '[]', 'utf8');
    }

    if (!fs.existsSync('./users.json')) {
      fs.writeFileSync('./users.json', '[]', 'utf8');
    }

    const roles = JSON.parse(fs.readFileSync('./roles.json', 'utf8'));
    const adminRole = roles.find((role) => role.title === 'admin');
    const userRole = roles.find((role) => role.title === 'member');

    if (!adminRole) {
      const role = new Role();
      role.create('admin');
    }

    if (!userRole) {
      const role = new Role();
      role.create('member');
    }
  } catch (error) {
    console.error('Error while initializing roles:', error);
  }
};

initialize();