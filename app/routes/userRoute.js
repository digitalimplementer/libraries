const express = require("express");
const router = express.Router();
const {
  create,
  findAll,
  byId,
  updateOne,
  deleteOne,
} = require("../controllers/user.controller");
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

router.post("/", authenticateUser, authorizeAdmin, create);
router.get("/", authenticateUser, authorizeAdmin, findAll);
router.get("/:id", authenticateUser, authorizeAdmin, byId);
router.put("/:id", authenticateUser, authorizeAdmin, updateOne);
router.delete("/:id", authenticateUser, authorizeAdmin, deleteOne);

module.exports = router;
