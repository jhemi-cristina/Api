const config = require("../../../knexfile");
const Knex = require("Knex");

const connection = Knex(config.development);

module.exports = connection;
