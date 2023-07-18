import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";

export default function HomePage() {
  const [music, setMusic] = useState(null);

  useEffect(() => {
    async function getBands() {
      const music = await sendRequest("/api/bands", "GET");
      setMusic(music);
      console.log("sent!");
    }
    getBands();
  }, []);

  console.log("music!", music);
  return (
    <>
      <h1>Main Page</h1>
      Music: {JSON.stringify(music)}
    </>
  );
}
