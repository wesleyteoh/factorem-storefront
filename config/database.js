const dotenv = require("dotenv");
dotenv.config();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === "true",
});

module.exports = pool;
