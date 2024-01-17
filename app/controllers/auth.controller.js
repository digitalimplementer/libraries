const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");

const initializeUserModel = require("../models/user.model");

const User = initializeUserModel(db.sequelize);

/**
 * Generate auth token
 * @param {user} param - user param
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, roleId: user.roleId },
    "secret",
    {
      expiresIn: "12h",
    }
  );
};

/**
 * Create a new user account
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {username: string, password: string, role: {id: number}} req.body - passed parameters
 */
const signup = async (req, res) => {
  const { username, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);

  try {
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      roleId: role.id,
    });

    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {username: string, password: string} req.body - passed parameters
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login };
