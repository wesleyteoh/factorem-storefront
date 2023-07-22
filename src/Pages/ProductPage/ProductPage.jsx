import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../../utilities/users-service";
import Loading from "../../Components/Loading";
import sendRequest from "../../utilities/send-request";

export default function ProductPage() {
  const [user, setUser] = useState(getUser());
  const [products, setProducts] = useState(null);
  const { productId } = useParams();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("loading");
    async function getProducts() {
      const products = await sendRequest(`/products/one/${productId}`, "GET");
      setProducts(products);
      setStatus("success");
    }
    getProducts();
  }, []);
  if (status === "loading") {
    return <Loading />;
  } else
    return (
      <>
        product page {productId}
        <div>{JSON.stringify(user)}</div>
        Products: {JSON.stringify(products)}
      </>
    );
}
