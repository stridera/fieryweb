const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const logger = require("../config/winston");

/**
 * Returns jwt token if valid username and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const login = (req, res) => {
  const { username, password } = req.body;
  User.query({
    where: { username: username },
  })
    .fetch()
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.get("password"))) {
          const token = jwt.sign(
            {
              id: user.get("id"),
              username: user.get("username"),
            },
            process.env.TOKEN_SECRET_KEY
          );

          res.json({
            success: true,
            token,
            username: user.get("username"),
          });
        } else {
          logger.log("error", `Authentication failed. Invalid password for user ${username}`);

          res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            message: "Authentication failed. Invalid username or password.",
          });
        }
      } else {
        logger.log("error", "Invalid username or password.");

        res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: "Authentication failed. Invalid username or password.",
        });
      }
    })
    .catch((error) => {
      logger.log("error", `Authentication Failed, Invalid username: ${username}`);

      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication failed. Invalid username or password.",
      });
    });
};

module.exports = { login };
