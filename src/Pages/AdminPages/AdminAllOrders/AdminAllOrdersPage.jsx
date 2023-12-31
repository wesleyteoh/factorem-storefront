// export default function AdminAllOrdersPage() {
//   return <div>Admin ALL Orders</div>;
// }

import { useEffect, useState } from "react";
import { getUser } from "../../../utilities/users-service";
import sendRequest from "../../../utilities/send-request";
import Loading from "../../../Components/Loading";
import AdminAllOrders from "../../../Components/Admin/AdminAllOrders";

export default function AdminAllOrdersPage() {
  const [user, setUser] = useState(getUser());
  const [pastPurchases, setPastPurchases] = useState("");
  const [shippingCategories, setShippingCategories] = useState([]);
  const [status, setStatus] = useState("idle");
  console.log(user);
  useEffect(() => {
    setStatus("loading");
    async function getPastPurchases() {
      try {
        const res = await sendRequest(`/api/adminSide/view/`, "POST", {
          email: user.user_email,
          userId: user.user_id,
        });
        // Sort by id
        // setPastPurchases(res.sort((a, b) => b.order_id - a.order_id));
        // Sort by date
        setPastPurchases(
          res.sort(
            (a, b) =>
              new Date(b.order_date_created) - new Date(a.order_date_created)
          )
        );
        setStatus("success");
      } catch (err) {
        console.log(err);
      }
    }
    async function getShippingCategories() {
      try {
        const shippingRes = await sendRequest("/api/shipping", "GET");
        setShippingCategories(shippingRes);
      } catch (err) {
        console.log(err);
      }
    }
    getPastPurchases();
    getShippingCategories();
  }, []);
  console.log("pastPurchases", pastPurchases);
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      {/* <AccountNavBar /> */}
      Admin All Orders Page
      {/* {JSON.stringify([pastPurchases])} */}
      {pastPurchases
        ? pastPurchases?.map((purchases) => (
            <div className="orderDetails" key={purchases.order_id}>
              <fieldset>
                <div>Order ID: {purchases.order_id}</div>
                <div>Buyer: {purchases.user_name}</div>
                <div>
                  <div>Address 1: {purchases.user_address_line1}</div>
                  <div>Address 2: {purchases.user_address_line2}</div>
                  <div>Postal Code: {purchases.user_postal_code}</div>
                  <div>Contact: {purchases.user_contact}</div>
                  <div>City: {purchases.user_city}</div>
                  <div>Country: {purchases.user_country}</div>
                </div>
                <div>
                  Placed On: {convertDate(purchases.order_date_created)}
                </div>
                <div>
                  Total({calculateTotalQuantity(purchases.products)} Items): $
                  {calculateTotalPrice(purchases.products)}
                </div>
                <AdminAllOrders
                  purchases={purchases}
                  shippingCategories={shippingCategories}
                  orderId={purchases.order_id}
                  userId={user.user_id}
                  email={user.user_email}
                />
              </fieldset>
            </div>
          ))
        : "no items found"}
    </>
  );
}

function convertDate(date) {
  const dateObject = new Date(date);
  // Get the time in Singapore time zone (UTC+8)
  // const singaporeTime = new Date(dateObject.getTime() + 8 * 60 * 60 * 1000);
  const singaporeTime = new Date(dateObject.getTime());
  const formattedDate = singaporeTime.toLocaleString("en-SG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Singapore",
  });
  return formattedDate;
}

function calculateTotalPrice(products) {
  let totalPrice = 0;
  for (const product of products) {
    const quantity = parseInt(product.order_quantity);
    const unitPrice = parseFloat(product.unit_price);
    totalPrice += quantity * unitPrice;
  }
  return totalPrice.toFixed(2); // To round the total price to 2 decimal places
}

function calculateTotalQuantity(products) {
  let totalQuantity = 0;
  for (const product of products) {
    const quantity = parseInt(product.order_quantity);
    totalQuantity += quantity;
  }
  return totalQuantity;
}
