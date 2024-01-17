const db = require("../models/index");

const initializeRoleModel = require("../models/role.model");

const Role = initializeRoleModel(db.sequelize);

/**
 * Create a new role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body - Request body parameters
 * @param {string} req.body.name - The name for the new role (string)
 */
const create = async (req, res) => {
  const { name } = req.body;
  try {
    const newRole = await Role.create({
      name,
    });

    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { create };
