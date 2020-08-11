const app = require("./config/express");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const joiErrorHandler = require("./middlewares/joiErrorHandler");
const requestLogger = require("./middlewares/requestLogger");

// Request logger
app.use(requestLogger);

app.use("/api", routes);

// Joi Error Handler Middleware
app.use(joiErrorHandler);

// Error Handler Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.methodNotAllowed);

// Start express app
app.listen(app.get("port"), app.get("host"), () => {
  console.log(`Server running at http://${app.get("host")}:${app.get("port")}`);
});
