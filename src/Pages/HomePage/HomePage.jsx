import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";
import MainProducts from "../../Components/MainProducts/MainProducts";
import { useNavigate } from "react-router";

export default function HomePage({ user }) {
  const [products, setProducts] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const [searchTermState, setSearchTermState] = useState("");
  const handleChange = (event) => {
    setSearchTermState(event.target.value);
  };

  useEffect(() => {
    setStatus("loading");
    async function getProducts() {
      const products = await sendRequest("/products/all", "GET");
      // To sort latest products first
      setProducts(products.sort((a, b) => b.product_id - a.product_id));
      setStatus("success");
    }
    getProducts();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTermState) {
      return;
    }
    navigate(`/products/search/${searchTermState}`);
  };

  if (status === "loading") {
    return <Loading />;
  } else
    return (
      <>
        <h1>Main Page</h1>
        User:{JSON.stringify(user)}
        Products: {JSON.stringify(products)}
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="searchField"
              className="input"
              value={searchTermState}
              placeholder="Search term"
              onChange={handleChange}
              required
            />
            <button>Search</button>
          </label>
        </form>
        {products?.map((product) => (
          <div key={product.product_id} className="productGrid">
            <MainProducts
              name={product.product_name}
              price={product.price}
              altprice={product.alt_price}
              description={product.description}
              imageUrl={product.image_link}
              stock={product.stock_avail}
              material={product.material_category_name}
              id={product.product_id}
              material_category={product.main_category_name}
            />
          </div>
        ))}
      </>
    );
}
