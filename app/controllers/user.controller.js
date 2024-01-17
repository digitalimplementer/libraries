const db = require("../models/index");

const initializeUserModel = require("../models/user.model");

const User = initializeUserModel(db.sequelize);

/**
 * Create a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body - Request body parameters
 * @param {string} req.body.username - The username for the new user (string)
 * @param {string} req.body.password - The password for the new user (string)
 * @param {Object} req.body.role - The role information for the new user (object)
 * @param {number} req.body.role.id - The ID of the role for the new user (number)
 */
const create = async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      roleId: req.body.role.id,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieve all users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieve a user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.params.id - The userId
 */
const byId = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Update a user by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.params.id - The userId
 * @param {Object} req.body - Request body parameters
 * @param {string} req.body.username - Updated username of the user
 * @param {string} req.body.password - Updated password of the user
 * @param {number} req.body.role - Updated publication role of the user
 */
const updateOne = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      ...req.body,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Delete a user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.params.id - The userId
 */
const deleteOne = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { create, findAll, byId, updateOne, deleteOne };
