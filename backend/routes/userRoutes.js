const express = require("express");
const {
  register,
  login,
  deleteUser,
  updateNickName,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.delete("/:userId", deleteUser);

router.patch("/:userId/nickname", updateNickName);

router.get("/", getAllUsers);

module.exports = router;
