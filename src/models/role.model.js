import BaseModel from './base.model.js';

class RoleModel extends BaseModel {
  constructor(input) {
    super();

    this.roleId = input.roleId;
  }
}

export default RoleModel;
