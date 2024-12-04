// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(protect, authorize("admin"), getUsers);

router
  .route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
