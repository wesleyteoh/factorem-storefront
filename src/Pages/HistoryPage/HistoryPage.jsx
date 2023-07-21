import { useEffect, useState } from "react";
import AccountNavBar from "../../Components/AccountNavBar";
import { getUser } from "../../utilities/users-service";
import sendRequest from "../../utilities/send-request";

export default function HistoryPage() {
  const [user, setUser] = useState(getUser());
  const [pastPurchases, setPastPurchases] = useState("");
  console.log(user);
  useEffect(() => {
    async function getPastPurchases() {
      try {
        const res = await sendRequest(`/api/history/${user.user_id}/`, "GET");
        setPastPurchases(res);
      } catch (err) {
        console.log(err);
      }
    }
    getPastPurchases();
  }, []);
  return (
    <>
      <AccountNavBar />
      History Page
      {JSON.stringify([pastPurchases])}
    </>
  );
}
