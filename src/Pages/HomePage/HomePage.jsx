import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";

export default function HomePage() {
  const [music, setMusic] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function getBands() {
      const music = await sendRequest("/products", "GET");
      setStatus("loading");
      setMusic(music);
      console.log("sent!");
      setStatus("success");
    }
    getBands();
  }, []);

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      <h1>Main Page</h1>
      Products: {JSON.stringify(music)}
    </>
  );
}
