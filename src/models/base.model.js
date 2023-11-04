import { v4 as uuid } from 'uuid';

class BaseModel {
  constructor() {
    this._id = uuid();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }
}

export default BaseModel;
