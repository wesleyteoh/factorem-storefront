const pool = require("../../config/database");

async function viewAllOrders(req, res) {
  const { email, userId } = req.body;
  try {
    const isEmailMatch = await verifyEmailMatch(pool, email, userId);
    if (isEmailMatch) {
      console.log("verified by db");

      const getHistory = await pool.query(`SELECT * FROM orders 
      LEFT JOIN accounts on orders.buyer_id = accounts.user_id
        LEFT JOIN account_details on accounts.user_id = account_details.account
        LEFT JOIN order_item ON orders.order_id = order_item.order_id
        LEFT JOIN products ON order_item.product_id = products.product_id
        LEFT JOIN shipping_category on orders.order_status = shipping_category.shipping_category_id
        LEFT JOIN material_category on products.material = material_category.material_category_id
        where orders.order_paid=true`);

      // reduce fn
      const consolidatedData = getHistory.rows.reduce((result, item) => {
        const existingOrder = result.find(
          (order) => order.order_id === item.order_id
        );
        // console.log("existingOrder", existingOrder);
        if (existingOrder) {
          existingOrder.products.push({
            order_item_id: item.order_item_id,
            product_id: item.product_id,
            order_quantity: item.order_quantity,
            unit_price: item.unit_price,
            product_name: item.product_name,
            material_category_name: item.material_category_name,
            //   price: item.price,
            //   alt_price: item.alt_price,
            image_link: item.image_link,
            //   stock_avail: item.stock_avail,
            description: item.description,
            product_active: item.product_active,
            category_id: item.category_id,
            material: item.material,
            //   product_dimen_x: item.product_dimen_x,
            //   product_dimen_y: item.product_dimen_y,
            //   product_dimen_z: item.product_dimen_z,
            //   datasheet: item.datasheet,
            leadtime: item.leadtime,
            //   shipping_category_id: item.shipping_category_id,
            shipping_type: item.shipping_type,
          });
        } else {
          result.push({
            order_id: item.order_id,
            order_date_created: item.order_date_created,
            buyer_id: item.buyer_id,
            order_status: item.order_status,
            order_paid: item.order_paid,
            user_name: item.user_name,
            user_address_line1: item.user_address_line1,
            user_address_line2: item.user_address_line2,
            user_postal_code: item.user_postal_code,
            user_contact: item.user_contact,
            user_city: item.user_city,
            user_country: item.user_country,
            products: [
              {
                order_item_id: item.order_item_id,
                product_id: item.product_id,
                order_quantity: item.order_quantity,
                unit_price: item.unit_price,
                product_name: item.product_name,
                material_category_name: item.material_category_name,
                //   price: item.price,
                //   alt_price: item.alt_price,
                image_link: item.image_link,
                //   stock_avail: item.stock_avail,
                description: item.description,
                product_active: item.product_active,
                category_id: item.category_id,
                material: item.material,
                //   product_dimen_x: item.product_dimen_x,
                //   product_dimen_y: item.product_dimen_y,
                //   product_dimen_z: item.product_dimen_z,
                //   datasheet: item.datasheet,
                leadtime: item.leadtime,
                //   shipping_category_id: item.shipping_category_id,
                shipping_type: item.shipping_type,
              },
            ],
          });
        }

        return result;
      }, []);
      // });
      // reduce fn end

      res.json(consolidatedData);
      try {
      } catch (err) {
        throw new Error();
      }
    } else throw new Error();
  } catch (err) {
    res.status(401).json("invalid request");
  }
}

async function updateShipping(req, res) {
  const { email, user, shippingStatus, orderId } = req.body;
  try {
    const isEmailMatch = await verifyEmailMatch(pool, email, user);
    if (isEmailMatch) {
      const shippingRes = await pool.query(`UPDATE orders
      SET order_status = ${shippingStatus}
      WHERE order_id = ${orderId} RETURNING order_status`);
      res.json(shippingRes.rows[0]);
    } else {
      res.status(401).json("unauthorized");
    }
  } catch (err) {
    res.status(401).json(err);
  }
}
module.exports = { viewAllOrders, updateShipping };

async function verifyEmailMatch(pool, email, userId) {
  // Validate payload email with internal email
  const verifyOriginEmail = await pool.query(
    "SELECT user_email FROM accounts WHERE user_email = $1 and user_id = $2",
    [email, userId]
  );
  const match = email === verifyOriginEmail.rows[0]?.user_email;
  return match;
}
