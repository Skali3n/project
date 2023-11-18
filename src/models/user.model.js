import BaseModel from './base.model.js';

class UserModel extends BaseModel {
  constructor(input) {
    super();

    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.email = input.email;
    this.password = input.password;
    this.roleId = input.roleId;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default UserModel;
