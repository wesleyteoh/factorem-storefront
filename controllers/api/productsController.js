const pool = require("../../config/database");

async function getAllProducts(req, res) {
  try {
    // Execute the raw SQL query
    const { rows } = await pool.query(`SELECT * FROM products
    JOIN material_category ON products.material = material_category.id 
    JOIN main_category ON products.category_id = main_category.id`);
    console.log("rows", rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

module.exports = { getAllProducts };
