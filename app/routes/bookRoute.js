const express = require("express");
const router = express.Router();
const {
  create,
  findAll,
  byId,
  updateOne,
  deleteOne,
} = require("../controllers/book.controller");
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

router.post("/", create);
router.get("/", findAll);
router.get("/:id", byId);
router.put("/:id", authenticateUser, authorizeAdmin, updateOne);
router.delete("/:id", authenticateUser, authorizeAdmin, deleteOne);

module.exports = router;
