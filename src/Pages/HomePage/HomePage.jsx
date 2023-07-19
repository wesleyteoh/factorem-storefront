import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";

export default function HomePage({ user }) {
  const [products, setProducts] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function getBands() {
      const products = await sendRequest("/products", "GET");
      setStatus("loading");
      setProducts(products);
      // console.log("Product send request success!");
      setStatus("success");
    }
    getBands();
  }, []);

  if (status === "loading") {
    return <Loading />;
  } else
    return (
      <>
        <h1>Main Page</h1>
        User:{JSON.stringify(user)}
        Products: {JSON.stringify(products)}
        {products?.map((product) => (
          <div key={product.id}>
            <img src={product.image_link} alt="product_image" />
          </div>
        ))}
      </>
    );
}
