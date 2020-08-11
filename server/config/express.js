const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const methodOverride = require("method-override");

const app = express();

require("dotenv").config();

app.set("port", process.env.APP_PORT || 3001);
app.set("host", process.env.APP_HOST || "localhost");

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(morgan("dev"));

module.exports = app;
