const express = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./user");

const router = express.Router();

// mount auth routes at /auth
router.use("/auth", authRoutes);

// mount user routes at /users
router.use("/users", userRoutes);

module.exports = router;
