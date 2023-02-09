require("dotenv").config();

module.exports = {
  host: "localhost",
  port: "3306",
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};
