const express = require("express");
const Joi = require("@hapi/joi");
const userCtrl = require("../controllers/user");
const isAuthenticated = require("../middlewares/authenticate");
const validate = require("../utils/joi.validate");

const router = express.Router();

const schema = {
  storeUser: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  updateUser: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

router
  .route("/")
  .post(validate(schema.storeUser), (req, res) => {
    userCtrl.store(req, res);
  })
  .get(isAuthenticated, (req, res) => {
    userCtrl.findAll(req, res);
  });

router
  .route("/:id")
  .get((req, res) => {
    userCtrl.findById(req, res);
  })
  .put(isAuthenticated, (req, res) => {
    userCtrl.update(req, res);
  })
  .delete(isAuthenticated, (req, res) => {
    userCtrl.destroy(req, res);
  });

module.exports = router;
