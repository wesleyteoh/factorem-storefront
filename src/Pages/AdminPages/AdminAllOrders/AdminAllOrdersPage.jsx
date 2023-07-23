// export default function AdminAllOrdersPage() {
//   return <div>Admin ALL Orders</div>;
// }

import { useEffect, useState } from "react";
import { getUser } from "../../../utilities/users-service";
import sendRequest from "../../../utilities/send-request";
import Loading from "../../../Components/Loading";
import AdminAllOrders from "../../../Components/Admin/AdminAllOrders";

export default function HistoryPage() {
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
        setPastPurchases(res);
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
      History Page
      {/* {JSON.stringify([pastPurchases])} */}
      {pastPurchases
        ? pastPurchases?.map((purchases) => (
            <div key={purchases.order_id}>
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
                <AdminAllOrders
                  purchases={purchases}
                  shippingCategories={shippingCategories}
                  orderId={purchases.order_id}
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
  const singaporeTime = new Date(dateObject.getTime() + 8 * 60 * 60 * 1000);
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
