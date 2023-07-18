const pool = require("../../config/database");

async function getAllProducts(req, res) {
  try {
    // Execute the raw SQL query
    const { rows } = await pool.query("SELECT * FROM products");
    console.log("rows", rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

module.exports = { getAllProducts };
