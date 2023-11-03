const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/Role');
const UserService = require('../services/userService');
const {
  validateUserInput,
  validateEmail,
  validatePassword,
} = require('../middlewares/validatorMiddleware');


const SECRET_KEY = 'HS256'; 

function registerUser(req, res) {
  const { email, password, firstName, lastName, roleId } = req.body;
  const usersData = UserService.getUsersData();

  const existingUser = usersData.users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) {
    return res.status(400).json({ message: emailError });
  }

  if (passwordError) {
    return res.status(400).json({ message: passwordError });
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Password hashing error' });
    }

    const user = new User();
    user.create(firstName, lastName, email, hash, roleId);

    res.status(201).json({ message: 'User is registered' });
  });
  }

function loginUser(req, res) {
  const { email, password } = req.body;
  const usersData = UserService.getUsersData();

  const user = usersData.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User is not found' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY);

    res.status(200).json({ token });
  });
}

function getAuthenticatedUser(req, res) {
  const user = req.user;
  const usersData = UserService.getUsersData();
  const authenticatedUser = usersData.users.find((u) => u.email === user.email);

  if (!authenticatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: `Hello, ${authenticatedUser.firstName} ${authenticatedUser.lastName}` });
}

function getUserById(req, res) {
  const userId = parseInt(req.params.userId);
  const user = req.user;

  if (user.id === userId || user.isSuperAdmin) {
    const usersData = UserService.getUsersData();
    const foundUser = usersData.users.find((u) => u.id === userId);

    if (foundUser) {
      return res.status(200).json(foundUser);
    }

    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(403).json({ message: 'Access is denied' });
}
  
  function updateUser(req, res) {
    const userId = parseInt(req.params.userId);
    const user = req.user;
  
    if (user.id === userId) {
      const { firstName, lastName, password } = req.body;
      const usersData = UserService.getUsersData();
      const foundUser = usersData.users.find((u) => u.id === userId);
  
      if (foundUser) {
        foundUser.firstName = firstName || foundUser.firstName;
        foundUser.lastName = lastName || foundUser.lastName;
  
        if (password) {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({ message: 'Password hashing error' });
            }
  
            foundUser.password = hash;
            UserService.saveUsersData(usersData);
            return res.status(200).json({ message: 'User updated' });
          });
        } else {
          UserService.saveUsersData(usersData);
          return res.status(200).json({ message: 'User updated' });
        }
      }
  
      return res.status(404).json({ message: 'User not found' });
    }
  
    return res.status(403).json({ message: 'Access is denied' });
  }

function createRole(req, res) {
  const { title } = req.body;
  
  const role = new Role(); 
  role.create(title);
  
  res.status(201).json({ message: 'Role created' });
  }

module.exports = {registerUser, loginUser, getAuthenticatedUser, getUserById, updateUser, createRole};
