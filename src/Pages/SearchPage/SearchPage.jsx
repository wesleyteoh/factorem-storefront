import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../Components/Loading";
import sendRequest from "../../utilities/send-request";
import MainProducts from "../../Components/MainProducts/MainProducts";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

export default function SearchPage() {
  const { searchTerm } = useParams();
  const [status, setStatus] = useState("idle");
  const [searchedProducts, setSearchedProducts] = useState(null);
  const [searchTermState, setSearchTermState] = useState(searchTerm);
  const navigate = useNavigate();
  //   console.log(searchTerm);
  useEffect(() => {
    setStatus("loading");

    async function getProducts() {
      try {
        const products = await sendRequest(
          `/api/products/search/${searchTerm}`,
          "GET"
        );
        setSearchedProducts(products);
        setStatus("success");
      } catch (err) {
        setStatus("success");
        console.log(err);
        // return <>No item found</>;
      }
    }
    // try {
    getProducts();
    // } catch (err) {
    //   console.log("error");
    //   console.log(err);
    // }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTermState(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (!searchTermState) {
    //   return;
    // }
    navigate(`/products/search/${searchTermState}`);
  };
  // Attempt at debounce search
  //   useEffect(() => {
  //     let getData;
  //     const fetchData = async () => {
  //       try {
  //         const responseData = await sendRequest(
  //           `/products/search/${searchTermState}`,
  //           "GET"
  //         );
  //         console.log(responseData[0]);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     getData = setTimeout(fetchData, 2000);

  //     return () => clearTimeout(getData);
  //   }, [searchTermState]);

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
            <small>Hint: You may use search by item id using id:</small>
          </label>
        </form>
        {/* <div>{JSON.stringify(searchedProducts?.length)}</div> */}
        {searchedProducts?.length === 0 ? (
          <div>No item found</div>
        ) : (
          <>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 1, sm: 2, md: 20 }}
            >
              {searchedProducts?.map((product) => (
                <Grid item xs={3} sm={4} md={4} key={product.product_id}>
                  <Paper
                    sx={{ width: 300, height: 200, boxShadow: 3 }}
                    key={product.product_id}
                  >
                    <div key={product.product_id} className="productGrid">
                      {/* <div>{JSON.stringify(product)}</div> */}
                      <MainProducts
                        name={product.product_name}
                        price={product.price}
                        altprice={product.alt_price}
                        description={product.description}
                        imageUrl={product.image_link}
                        stock={product.stock_avail}
                        material_category={product.main_category_name}
                        material={product.material_category_name}
                        id={product.product_id}
                      />
                    </div>
                  </Paper>
                  <br />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </>
    );
}
