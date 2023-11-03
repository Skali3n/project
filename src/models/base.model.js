const { v4: uuid } = require("uuid");

class BaseModel {
  _id = uuid();
  _createdAt = new Date();
  _updatedAt = new Date();

  constructor() {}
}

module.exports = BaseModel;
