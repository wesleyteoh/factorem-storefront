const pool = require("../../config/database");
async function shippingCategories(req, res) {
  try {
    const shipping = await pool.query("SELECT * FROM shipping_category");

    res.json(shipping.rows);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { shippingCategories };
