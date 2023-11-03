const BaseModel = require("./base.model");

class UserModel extends BaseModel {
  constructor(input) {
    super();

    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.email = input.email;
    this.password = input.password;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = UserModel;
