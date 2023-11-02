function validateEmail(email) {
  if (!email.includes('@')) {
    return 'Email must contain "@"';
  }
  return null;
}

function validatePassword(password) {
  if (password.length < 8) {
    return 'The password must contain at least 8 characters';
  }
  return null;
}

function validateUserInput(req, res, next) {
  const { email, password, firstName, lastName } = req.body;
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) {
    return res.status(400).json({ message: emailError });
  }

  if (passwordError) {
    return res.status(400).json({ message: passwordError });
  }

  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'First and last name are required' });
  }

  next();
}

module.exports = { validateUserInput, validateEmail, validatePassword };
