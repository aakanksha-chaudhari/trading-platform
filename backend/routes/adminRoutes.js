const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Make sure NO parentheses here
router.get("/users", adminController.getUsers);
router.post("/add-user", adminController.addUser);
router.post("/remove-user", adminController.removeUser);
router.post("/reset-balance", adminController.resetBalances);
router.get("/logs", adminController.getLogs);

module.exports = router;
