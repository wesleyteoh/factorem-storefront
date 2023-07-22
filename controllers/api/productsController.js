const pool = require("../../config/database");

async function getAllProducts(req, res) {
  try {
    // Execute the raw SQL query
    const { rows } = await pool.query(`SELECT * FROM products
    JOIN material_category ON products.material = material_category.material_category_id 
    JOIN main_category ON products.category_id = main_category.main_category_id
    WHERE product_active=true
    `);
    // console.log("rows", rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}
async function getOneProduct(req, res) {
  const productId = req.params.productId;
  console.log(productId);
  try {
    // Execute the raw SQL query
    const { rows } = await pool.query(
      `SELECT * FROM products
    JOIN material_category ON products.material = material_category.material_category_id
    JOIN main_category ON products.category_id = main_category.main_category_id
    WHERE product_active=true and products.product_id=$1
    `,
      [productId]
    );

    res.status(200).json(rows);
    // res.json(productId);
  } catch (error) {
    console.error("Error executing query:", error);
    res.json("could not get all products");
  }
}

module.exports = { getAllProducts, getOneProduct };
