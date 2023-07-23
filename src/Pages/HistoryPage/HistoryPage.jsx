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
        setPastPurchases(res);
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
      {/* {JSON.stringify([pastPurchases])} */}
      {pastPurchases
        ? pastPurchases?.map((purchases) => (
            <div key={purchases.order_id}>
              <fieldset>
                <div>Order ID: {purchases.order_id}</div>
                <div>
                  Placed On: {convertDate(purchases.order_date_created)}
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
