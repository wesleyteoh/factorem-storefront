const pool = require("../../config/database");

async function getHistory(req, res) {
  const userId = req.params.userId;
  try {
    const getHistory = await pool.query(
      `SELECT * FROM orders 
    LEFT JOIN order_item ON orders.order_id = order_item.order_id
    LEFT JOIN products ON order_item.product_id = products.product_id
    LEFT JOIN shipping_category on orders.order_status = shipping_category.shipping_category_id
    LEFT JOIN material_category on products.material = material_category.material_category_id
    where orders.order_paid=true and orders.buyer_id = $1`,
      [userId]
    );
    // console.log(getHistory);
    // res.json(getHistory.rows);

    // reduce fn
    const consolidatedData = getHistory.rows.reduce((result, item) => {
      const existingOrder = result.find(
        (order) => order.order_id === item.order_id
      );
      console.log("existingOrder", existingOrder);
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
          //   product_active: item.product_active,
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
              //   product_active: item.product_active,
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
  } catch (err) {
    console.log(err);
    res.status(401).json("Bad request");
  }
}

module.exports = { getHistory };
