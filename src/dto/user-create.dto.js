const validateUser = (req, res, next) => {
  const errors = [];

  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      errors.push("First name is required");
    }
    if (!lastName) {
      errors.push("Last name is required");
    }
    if (!email) {
      errors.push("Email is required");
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) {
      errors.push("Email is invalid");
    }
    if (!password) {
      errors.push("Password is required");
    }
    if (password && password.length < 8) {
      errors.push("Password should be at least 8 characters");
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: "Validation failed", errors });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = validateUser;
