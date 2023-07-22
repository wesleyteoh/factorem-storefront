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
    res.status(500).json("could not get product");
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
    res.status(500).json("could not get product");
  }
}

async function getSearchedProduct(req, res) {
  const searchTerm = req.params.searchTerm;
  console.log(searchTerm);
  try {
    const { rows } = await pool.query(`SELECT *
    FROM products
    JOIN material_category ON products.material = material_category.material_category_id
    JOIN main_category ON products.category_id = main_category.main_category_id
    WHERE product_active = true
    AND (product_name LIKE '%${searchTerm}%' OR products.description LIKE '%${searchTerm}%')`);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
module.exports = { getAllProducts, getOneProduct, getSearchedProduct };
