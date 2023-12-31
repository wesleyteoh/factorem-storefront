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
  if (searchTerm.startsWith("id:")) {
    console.log("search by id");
    const extractedNumber = searchTerm.replace("id:", "");
    console.log(parseInt(extractedNumber));

    if (!isNaN(extractedNumber)) {
      try {
        const { rows } = await pool.query(`SELECT *
        FROM products
        JOIN material_category ON products.material = material_category.material_category_id 
        JOIN main_category ON products.category_id = main_category.main_category_id
        WHERE product_active = true
        AND product_id = ${extractedNumber}`);
        res.status(200).json(rows);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(200).json("");
    }
  } else {
    try {
      const { rows } = await pool.query(`SELECT *
      FROM products
      JOIN material_category ON products.material = material_category.material_category_id
      JOIN main_category ON products.category_id = main_category.main_category_id
      WHERE product_active = true
      AND (product_name ILIKE '%${searchTerm}%' OR products.description ILIKE '%${searchTerm}%' OR material_category.material_category_name ILIKE '%${searchTerm}%')`);
      res.status(200).json(rows);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

async function getMaterialCategory(req, res) {
  try {
    const { rows } = await pool.query(`SELECT * FROM material_category
    JOIN main_category ON material_category.main_category_id = main_category.main_category_id;`);
    res.json(consolidateArrayByMainCategory(rows));
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  getAllProducts,
  getOneProduct,
  getSearchedProduct,
  getMaterialCategory,
};

// Functions
function consolidateArrayByMainCategory(array) {
  const consolidatedArray = [];

  array.forEach((item) => {
    const { main_category_id, main_category_name } = item;
    const existingCategory = consolidatedArray.find(
      (category) => category.main_category_id === main_category_id
    );

    if (existingCategory) {
      existingCategory.material_categories.push({
        material_category_id: item.material_category_id,
        material_category_name: item.material_category_name,
      });
    } else {
      consolidatedArray.push({
        main_category_id,
        main_category_name,
        material_categories: [
          {
            material_category_id: item.material_category_id,
            material_category_name: item.material_category_name,
          },
        ],
      });
    }
  });

  return consolidatedArray;
}
