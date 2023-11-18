import { v4 as uuid } from 'uuid';

class BaseModel {
  _id;
  _createdAt;
  _updatedAt;

  constructor(input) {
    if (input) {
      this._id = input._id;
      this._createdAt = input._createdAt;
      this._updatedAt = input._updatedAt;
    }
  }

  create() {
    this._id = uuid();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }
}

export default BaseModel;
