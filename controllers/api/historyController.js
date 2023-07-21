const pool = require("../../config/database");

async function getHistory(req, res) {
  const userId = req.params.userId;
  try {
    const getHistory = await pool.query(
      `SELECT * FROM orders 
    LEFT JOIN order_item ON orders.order_id = order_item.order_id
    LEFT JOIN products ON order_item.product_id = products.product_id
    LEFT JOIN shipping_category on orders.order_status = shipping_category.shipping_category_id
    where orders.order_paid=true and orders.buyer_id = $1`,
      [userId]
    );
    // console.log(getHistory);
    res.json(getHistory.rows);
  } catch (err) {
    console.log(err);
    res.status(401).json("Bad request");
  }
}

module.exports = { getHistory };
