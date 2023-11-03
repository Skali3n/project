const fs = require('fs');
const dataFilePath = './users.json';

class UserService {
  static getUsersData() {
    try {
      return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch (err) {
      console.error('Error reading data file:', err);
      return { users: [] };
    }
  }

  static saveUsersData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  }
}

module.exports = UserService;
