import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../utilities/users-service";

export default function AccountPage({ user }) {
  //   const { userId } = useParams();
  //   const isUser = user.user_id == userId;
  //   console.log(isUser);

  const [user1, setUser1] = useState("");
  useEffect(() => {
    const loggedInUser = getUser();
    setUser1(loggedInUser);
  }, []);

  return (
    <>
      Account Page
      {JSON.stringify(user1)}
    </>
  );
}
