import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";
import MainProducts from "../../Components/MainProducts/MainProducts";

export default function HomePage({ user }) {
  const [products, setProducts] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("loading");
    async function getProducts() {
      const products = await sendRequest("/products/all", "GET");
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
        <h1>Main Page</h1>
        User:{JSON.stringify(user)}
        Products: {JSON.stringify(products)}
        {products?.map((product) => (
          <div key={product.product_id}>
            {/* <CartItems
              product={product.product_name}
              price={product.price}
              quantity={product.stock_avail}
            /> */}
            <MainProducts
              name={product.product_name}
              price={product.price}
              altprice={product.alt_price}
              description={product.description}
              imageUrl={product.image_link}
              stock={product.stock_avail}
              material={product.material_category_name}
              id={product.product_id}
            />
          </div>
        ))}
      </>
    );
}
