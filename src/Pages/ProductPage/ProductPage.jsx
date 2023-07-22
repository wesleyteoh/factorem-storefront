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
  const [error, setError] = useState("");

  useEffect(() => {
    setStatus("loading");
    async function getProducts() {
      const products = await sendRequest(`/products/one/${productId}`, "GET");
      setProducts(products);
      setStatus("success");
    }
    getProducts();
  }, []);

  const handleAddToCart = async (event) => {
    event.preventDefault();
    console.log(products[0].alt_price);
    try {
      await sendRequest(`/api/cart/${user.user_id}/add`, "POST", {
        product_id: parseInt(productId),
        product_price: products[0].alt_price,
      });
      setError("Added to cart!");
    } catch (err) {
      console.log(err);
      setError("Add to cart failed");
    }
  };
  if (status === "loading") {
    return <Loading />;
  } else
    return (
      <>
        product page {productId}
        user:{JSON.stringify(user.user_id)}
        <div>{JSON.stringify(user)}</div>
        Products: {JSON.stringify(products)}
        <div>
          <button onClick={handleAddToCart}>Add To Cart</button>
          <span>{error}</span>
        </div>
      </>
    );
}
