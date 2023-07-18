const pool = require("../../config/database");

async function getAllBands(req, res) {
  try {
    // Execute the raw SQL query
    const { rows } = await pool.query("SELECT * FROM bands");
    console.log("rows", rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

module.exports = { getAllBands };
