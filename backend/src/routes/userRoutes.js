const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const authenticateToken = require("../middleware/authMiddleware");

// User routes
router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.post("/logout", userControllers.logoutUser);

// Profile routes (authenticated) get profileDetails
router.get(
  "/profile/profileDetails",
  authenticateToken,
  userControllers.userProfile
);

// Profile updating
router.put("/profile", authenticateToken, userControllers.updateProfile);

module.exports = router;
