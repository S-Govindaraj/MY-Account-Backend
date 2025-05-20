// routes/userRoutes.js
const express = require("express");
const { check, validationResult } = require("express-validator");
const api = express.Router();
const auth = require("../Middleware/Auth");
const userController = require("../Controllers/User");
const controller = require("../Controllers/Controllers");
const groupRouting = require("../Middleware/groupRouting");
const loginController = require("../Controllers/Auth/login");

api.post("/login", loginController.login);

// Encrypt / Decrypt Routes
api.post('/encrypt', controller.encrypt);
api.post('/decrypt', controller.decrypt);

const validateBook = [
  check('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  check('author').notEmpty().withMessage('Author is required').isString().withMessage('Author must be a string'),
  check('title').optional().isString().withMessage('Title must be a string'),
  check('year')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Year must be a positive integer'),
];

// Validation result middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
groupRouting(api, "/", auth, (api) => {
  api.get("/getAllUsers", userController.getAllUsers);
  api.post("/users", userController.createUser);

  // Books
});

module.exports = api;
