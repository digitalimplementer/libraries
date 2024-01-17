const express = require("express");
const router = express.Router();

const { create } = require("../controllers/role.controller");

router.post("/", create);

module.exports = router;
