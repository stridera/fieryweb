const knex = require("./knex");
const bookshelf = require("bookshelf");

module.exports = bookshelf(knex);
