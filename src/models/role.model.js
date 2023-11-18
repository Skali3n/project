import BaseModel from './base.model.js';

class RoleModel extends BaseModel {
  constructor(input) {
    super(input);

    this.title = input.title;
  }

  get roleId() {
    return Number(this._id);
  }
}

export default RoleModel;
