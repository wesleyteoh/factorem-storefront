import { useEffect, useState } from "react";
import AccountNavBar from "../../Components/AccountNavBar";
import { getUser } from "../../utilities/users-service";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";

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

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      <AccountNavBar />
      History Page
      {JSON.stringify([pastPurchases])}
    </>
  );
}
