import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../Components/Loading";
import sendRequest from "../../utilities/send-request";
import MainProducts from "../../Components/MainProducts/MainProducts";

export default function SearchPage() {
  const { searchTerm } = useParams();
  const [status, setStatus] = useState("idle");
  const [searchedProducts, setSearchedProducts] = useState(null);
  const [searchTermState, setSearchTermState] = useState("");
  const navigate = useNavigate();
  //   console.log(searchTerm);
  useEffect(() => {
    setStatus("loading");
    async function getProducts() {
      const products = await sendRequest(
        `/products/search/${searchTerm}`,
        "GET"
      );
      setSearchedProducts(products);
      setStatus("success");
    }
    getProducts();
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTermState(event.target.value);
  };
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
        {/* <div>{JSON.stringify(searchedProducts?.length)}</div> */}
        {searchedProducts?.length === 0
          ? "No items found"
          : searchedProducts?.map((product) => (
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
                />
              </div>
            ))}
      </>
    );
}
