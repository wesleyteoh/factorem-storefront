const pool = require("../../config/database");

async function viewCart(req, res) {
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
        console.log("correcting cartId");
      }
      // Check and update price
      for (const checkProducts of getCart.rows) {
        console.log("check product_id", checkProducts.product_id);
        const pricesMatch =
          checkProducts.unit_price === checkProducts.alt_price;
        console.log("pricesMatch", pricesMatch);
        if (!pricesMatch) {
          await pool.query(`UPDATE order_item
          set unit_price = ${checkProducts.alt_price}
          WHERE order_id = ${cartId} and product_id=${checkProducts.product_id}`);
        }
      }
      // End of check and update price

      //   Get cart again after checks
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
        console.log("correcting cartId");
      }
      // End of getCart again
      res.json(getCart.rows);
    } else throw new Error();
  } catch (err) {
    console.log(err);
    res.status(401).json("Bad request");
  }
}
async function checkout(req, res) {
  const userId = req.params.userId;
  console.log("userId", userId);
  try {
    const { email, order_id } = req.body;
    // Validate payload email with internal email
    const verifyOriginEmail = await pool.query(
      "SELECT user_email FROM accounts WHERE user_email = $1 and user_id=$2",
      [email, userId]
    );
    console.log(email, order_id);
    const match = email === verifyOriginEmail.rows[0].user_email;
    if (match) {
      const order_status = await pool.query(
        `SELECT order_paid FROM orders where order_id = $1`,
        [order_id]
      );
      console.log(order_status.rows[0]?.order_paid);
      if (
        order_status.rows[0]?.order_paid === undefined ||
        order_status.rows[0]?.order_paid === true
      ) {
        throw new Error();
      } else {
        await pool.query(
          `UPDATE orders
              SET order_paid = true,
              order_date_created = now()
              WHERE order_id=$1`,
          [order_id]
        );
      }
      res.json("checkout success");

      // Create new cart after checkout
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
          console.log("checkout success, creating new cart");
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

        // res.json(getCart.rows);
      } else throw new Error();
      //   End of add new cart
    } else throw new Error();
  } catch (err) {
    console.log(err);
    res.status(403).json("checkout unsuccess");
  }
}

async function addToCart(req, res) {
  const userId = req.params.userId;
  console.log("userId", userId);
  const { product_id, product_price } = req.body;

  try {
    let getCart = await pool.query(
      "SELECT * FROM orders WHERE order_paid=false and buyer_id=$1",
      [userId]
    );
    const cartId = getCart.rows[0].order_id;
    const ProductIdsInCart = await pool.query(
      `SELECT products.product_id FROM orders 
    LEFT JOIN order_item ON orders.order_id = order_item.order_id
    LEFT JOIN products ON order_item.product_id = products.product_id
    LEFT JOIN shipping_category on orders.order_status = shipping_category.shipping_category_id
    where orders.order_id = $1 and orders.buyer_id = $2`,
      [cartId, userId]
    );

    const productExists = ProductIdsInCart.rows.some(
      (item) => item.product_id === product_id
    );
    console.log(productExists);
    if (productExists) {
      const item_quantity = await pool.query(
        `SELECT order_quantity FROM orders
        LEFT JOIN order_item ON orders.order_id = order_item.order_id
        LEFT JOIN products ON order_item.product_id = products.product_id
        LEFT JOIN shipping_category ON orders.order_status = shipping_category.shipping_category_id
        WHERE orders.order_id = $1 AND orders.buyer_id = $2 AND products.product_id=$3
          AND order_item.product_id = products.product_id`,
        [cartId, userId, product_id]
      );

      await pool.query(
        `UPDATE order_item AS oi1
      SET order_quantity = $1
      FROM orders
      LEFT JOIN order_item AS oi2 ON orders.order_id = oi2.order_id
      LEFT JOIN products ON oi2.product_id = products.product_id
      LEFT JOIN shipping_category ON orders.order_status = shipping_category.shipping_category_id
      WHERE orders.order_id = $2 AND orders.buyer_id = $3 AND products.product_id = $4
        AND oi1.product_id = products.product_id`,
        [item_quantity.rows[0].order_quantity + 1, cartId, userId, product_id]
      );
      //   res.json(item_quantity.rows[0].order_quantity);
      res.json("update cart success");
    } else {
      await pool.query(
        `INSERT INTO order_item(order_id,product_id,order_quantity,unit_price) VALUES ((SELECT order_id FROM orders WHERE order_id = $1),(SELECT product_id FROM products WHERE product_id = $2),1,$3)`,
        [cartId, product_id, product_price]
      );
      res.json("add to cart success");
    }
    // res.json(ProductIdsInCart.rows);
  } catch (err) {
    console.log(err);
    res.status(401).json("Add to cart failed");
  }
}

async function deleteOneCartItem(req, res) {
  const { order_id, product_id } = req.body;
  const userId = req.params.userId;
  const checkCartId = await pool.query(
    `SELECT orders.order_id FROM orders
    LEFT JOIN order_item ON orders.order_id = order_item.order_id
    LEFT JOIN products ON order_item.product_id = products.product_id
    LEFT JOIN shipping_category on orders.order_status = shipping_category.shipping_category_id
    where orders.buyer_id=$1 and orders.order_paid=false`,
    [userId]
  );

  try {
    if (order_id === checkCartId.rows[0].order_id) {
      await pool.query(
        `DELETE from order_item
              where order_id=$1 and product_id=$2`,
        [order_id, product_id]
      );
      res.json("delete success");
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.status(403).json("could not delete item");
  }
}
module.exports = { viewCart, checkout, addToCart, deleteOneCartItem };
