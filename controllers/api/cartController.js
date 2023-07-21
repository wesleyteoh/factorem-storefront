const pool = require("../../config/database");

async function addToCart(req, res) {
  const userId = req.params.userId;
  console.log("userId", userId);
  try {
    const { email } = req.body;
    // Validate payload email with internal email
    const verifyOriginEmail = await pool.query(
      "SELECT user_email FROM accounts WHERE user_email = $1 and user_id=$2",
      [email, userId]
    );
    const match = email === verifyOriginEmail.rows[0].user_email;
    if (match) {
      let getCart = await pool.query(
        "SELECT * FROM orders WHERE order_paid=false and buyer_id=$1",
        [userId]
      );
      if (getCart.rows[0] == null) {
        console.log("no cart found, creating new cart");
        getCart = await pool.query(
          "INSERT INTO orders(order_date_created,buyer_id,order_status,order_paid) VALUES(now(),(SELECT user_id FROM accounts WHERE user_id = $1),(SELECT shipping_category_id FROM shipping_category where shipping_type = 'Order Placed'),FALSE )  RETURNING *",
          [userId]
        );
      }
      const cartId = getCart.rows[0].order_id;

      getCart = await pool.query(
        `SELECT * FROM orders 
          LEFT JOIN order_item ON orders.order_id = order_item.order_id
          LEFT JOIN products ON order_item.product_id = products.product_id
          LEFT JOIN shipping_category on orders.order_status = shipping_category.shipping_category_id
          where orders.order_id=$1`,
        [cartId]
      );
      //   Sometimes cart_id returns null when there are no products
      if (getCart.rows[0].order_id === null) {
        getCart.rows[0].order_id = cartId;
      }

      res.json(getCart.rows);
    } else throw new Error();
  } catch (err) {
    console.log(err);
    res.status(401).json("Bad request");
  }
}

module.exports = { addToCart };
