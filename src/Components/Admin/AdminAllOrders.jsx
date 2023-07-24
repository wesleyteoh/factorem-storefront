import { useState } from "react";
import sendRequest from "../../utilities/send-request";

export default function AdminAllOrders({
  purchases,
  shippingCategories,
  orderId,
  userId,
  email,
}) {
  const [updateStatus, setUpdateStatus] = useState(purchases.order_status);
  const [currentStatus, setCurrentStatus] = useState(
    getShippingType(purchases.order_status)
  );
  console.log("currentStatus", purchases.order_status);
  const handleShippingChange = (event) => {
    setUpdateStatus(event.target.value);
  };

  function getShippingType(shippingCategoryId) {
    const shippingObject = shippingCategories.find(
      (item) => item.shipping_category_id === shippingCategoryId
    );
    return shippingObject
      ? shippingObject.shipping_type
      : "Shipping type not found";
  }

  const handleClick = async (event) => {
    event.preventDefault();
    console.log("shippingStatus", updateStatus);
    console.log("OrderId", orderId);
    console.log("userId", userId);
    console.log("email", email);
    try {
      const updateShipping = async () => {
        const shippingRes = await sendRequest(
          `/api/adminSide/updateShipping/`,
          "PUT",
          {
            email: email,
            user: userId,
            shippingStatus: updateStatus,
            orderId: orderId,
          }
        );
        console.log("shippingRes", shippingRes.order_status);
        setCurrentStatus(getShippingType(shippingRes.order_status));
      };
      updateShipping();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* {JSON.stringify(purchases)} */}
      {/* {JSON.stringify(shippingCategories)} */}
      <div>
        <div>Current status: {currentStatus}</div>
        <select onChange={handleShippingChange} value={updateStatus}>
          {shippingCategories.map((shipping) => (
            <option
              key={shipping.shipping_category_id}
              value={shipping.shipping_category_id}
            >
              {shipping.shipping_type}
            </option>
          ))}
        </select>
        <button onClick={handleClick}>Update status</button>
        {purchases.products.map((item) => (
          <div key={item.product_id}>
            <fieldset>
              {/* <div>{JSON.stringify(item.product_active)}</div> */}
              <img width="15%" src={item.image_link} alt="product_image" />
              <div>Product name: {item.product_name}</div>
              <div>Material: {item.material_category_name}</div>
              <div>Unit Price: ${item.unit_price}</div>
              <div>Quantity: {item.order_quantity}</div>
              <div>Lead time: {item.leadtime} days</div>
              {/* <div>Status: {item.shipping_type}</div> */}
              {item.product_active ? <></> : <div>DISCONTINUED</div>}
              <div>
                Product Total: $
                {(item.unit_price * item.order_quantity).toFixed(2)}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
    </>
  );
}
