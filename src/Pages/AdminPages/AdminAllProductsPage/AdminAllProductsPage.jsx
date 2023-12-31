import { useEffect, useState } from "react";
import sendRequest from "../../../utilities/send-request";
import Loading from "../../../Components/Loading";
// import MainProducts from "../../../Components/MainProducts/MainProducts";
import { useNavigate } from "react-router";
import AdminAllProductsComp from "../../../Components/Admin/AdminAllProductsComp";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

export default function AdminAllProductsPage({ user }) {
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
      try {
        const products = await sendRequest("/api/adminSide/all/", "GET");
        setProducts(products.sort((a, b) => b.product_id - a.product_id));
        setStatus("success");
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTermState) {
      return;
    }
    navigate(`/admin/search/${searchTermState}`);
  };

  if (status === "loading") {
    return <Loading />;
  } else
    return (
      <>
        <h1>Admin Product Page</h1>
        {/* User:{JSON.stringify(user)}
        Products: {JSON.stringify(products)} */}
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
        <br />
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 1, sm: 2, md: 20 }}
        >
          {products?.map((product) => (
            <Grid item xs={3} sm={4} md={4} key={product.product_id}>
              <Paper
                sx={{ width: 300, height: 250, boxShadow: 3 }}
                key={product.product_id}
              >
                <div key={product.product_id} className="productGrid">
                  <AdminAllProductsComp
                    productActive={product.product_active}
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
              </Paper>
              <br />
            </Grid>
          ))}
        </Grid>
      </>
    );
}
