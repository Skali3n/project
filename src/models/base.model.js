import { v4 as uuid } from 'uuid';

class BaseModel {
  _id = uuid();
  _createdAt = new Date();
  _updatedAt = new Date();

  constructor() {}
}

export default BaseModel;
