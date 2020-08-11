const logger = require("../config/winston");

module.exports = (req, res, next) => {
  // TODO response body
  let requestBody = typeof req.body !== "string" ? JSON.stringify(req.body) : req.body;
  logger.log("info", "Method:" + req.method + " Path:" + req.path + " Request Body:" + requestBody);
  logger.log("info", "--------------------------------------------------");
  return next();
};
