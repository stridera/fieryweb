const knex = require("knex");
const database = require("../config/database");

module.exports = knex(database);
