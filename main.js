const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Role = require('./models/Role');
const { validateUserInput } = require('./middlewares/validatorMiddleware');
const { verifyToken } = require('./middlewares/authMiddleware');
const {
  registerUser,
  loginUser,
  getAuthenticatedUser,
  getUserById,
  updateUser,
  createRole
} = require('./controllers/userController');
const UserService = require('./services/userService');
const initialize = require('./initialize');

const app = express();
const PORT = 4000;

app.use(express.json());

app.post('/register', validateUserInput, registerUser);
app.post('/login', loginUser);
app.post('/roles', createRole);
app.post('/users', (req, res) => {
  const input = req.body;
  const user = new User();

  try {
    const roles = JSON.parse(fs.readFileSync('./roles.json', 'utf8'));
    const role = roles.find((role) => role.id === input.roleId);

    if (!role) {
      return res.status(400).send('Role does not exist');
    }

    const newUser = user.create(
      input.firstName,
      input.lastName,
      input.email,
      input.password,
      input.roleId
    );
    
    if (newUser) {
      res.send({ ...newUser, role });
    } else {
      res.status(500).send('Failed to create user');
    }
  } catch (error) {
    console.error('Error while processing user creation request:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/users/me', verifyToken, getAuthenticatedUser);

app.get('/users/:userId', verifyToken, getUserById);
app.put('/users/:userId', verifyToken, updateUser);

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
