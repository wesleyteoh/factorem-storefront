import { useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../../utilities/users-service";

export default function ProductPage() {
  const [user, setUser] = useState(getUser());
  const { productId } = useParams();
  return (
    <>
      product page {productId}
      <div>{JSON.stringify(user)}</div>
    </>
  );
}
