import { useEffect, useState } from "react";
import AccountNavBar from "../../Components/AccountNavBar";
import { getUser } from "../../utilities/users-service";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";
import PastPurchases from "../../Components/PastPurchases/PastPurchases";

export default function HistoryPage() {
  const [user, setUser] = useState(getUser());
  const [pastPurchases, setPastPurchases] = useState("");
  const [status, setStatus] = useState("idle");
  console.log(user);
  useEffect(() => {
    setStatus("loading");
    async function getPastPurchases() {
      try {
        const res = await sendRequest(`/api/history/${user.user_id}/`, "GET");
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
    getPastPurchases();
  }, []);
  console.log("pastPurchases", pastPurchases);
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      <AccountNavBar />
      History Page
      {pastPurchases
        ? pastPurchases?.map((purchases) => (
            <div className="orderDetails" key={purchases.order_id}>
              <fieldset>
                <div>Order ID: {purchases.order_id}</div>
                <div>
                  Placed On: {convertDate(purchases.order_date_created)}
                </div>
                <div>
                  Total({calculateTotalQuantity(purchases.products)} Items): $
                  {calculateTotalPrice(purchases.products)}
                </div>
                <PastPurchases purchases={purchases} />
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
