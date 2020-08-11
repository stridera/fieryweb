const bcrypt = require("bcrypt");
const HttpStatus = require("http-status-codes");
const User = require("../models/user");

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAll = (req, res) => {
  User.forge()
    .fetchAll()
    .then((user) =>
      res.json({
        error: false,
        data: user.toJSON(),
      })
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
};

/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findById = (req, res) => {
  User.forge({ id: req.params.id })
    .fetch()
    .then((user) => {
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({
          error: true,
          data: {},
        });
      } else {
        res.json({
          error: false,
          data: user.toJSON(),
        });
      }
    })
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
};

/**
 * Store new user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const store = (req, res) => {
  const { first_name, last_name, email } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);

  User.forge({
    first_name,
    last_name,
    email,
    password,
  })
    .save()
    .then((user) =>
      res.json({
        success: true,
        data: user.toJSON(),
      })
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
};

/**
 * Update user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const update = (req, res) => {
  User.forge({ id: req.params.id })
    .fetch({ require: true })
    .then((user) =>
      user
        .save({
          first_name: req.body.first_name || user.get("first_name"),
          last_name: req.body.last_name || user.get("last_name"),
          email: req.body.email || user.get("email"),
        })
        .then(() =>
          res.json({
            error: false,
            data: user.toJSON(),
          })
        )
        .catch((err) =>
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            data: { message: err.message },
          })
        )
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
};

/**
 * Destroy user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const destroy = (req, res) => {
  User.forge({ id: req.params.id })
    .fetch({ require: true })
    .then((user) =>
      user
        .destroy()
        .then(() =>
          res.json({
            error: false,
            data: { message: "User deleted successfully." },
          })
        )
        .catch((err) =>
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            data: { message: err.message },
          })
        )
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
};

module.exports = { findAll, findById, store, update, destroy };
