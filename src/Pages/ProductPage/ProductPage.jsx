import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../../utilities/users-service";
import Loading from "../../Components/Loading";
import sendRequest from "../../utilities/send-request";
import { Link } from "react-router-dom";
import Error404Page from "../Error404Page/Error404Page";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";

export default function ProductPage() {
  const [user, setUser] = useState(getUser());
  const [products, setProducts] = useState(null);
  const { productId } = useParams();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [isValidWebsite, setIsValidWebsite] = useState(true);

  const websiteRegex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/;

  useEffect(() => {
    setStatus("loading");

    async function getProducts() {
      try {
        const products = await sendRequest(
          `/api/products/one/${productId}`,
          "GET"
        );

        setProducts(products);
        // console.log(products[0].image_link);
        setIsValidWebsite(websiteRegex.test(products[0].datasheet));
        setStatus("success");
      } catch {
        console.log("fetch failed");
      }
    }
    getProducts();

    if (user === null) {
      setError("Log in to add to cart");
    }
  }, []);

  const handleAddToCart = async (event) => {
    event.preventDefault();
    console.log(products[0].alt_price);
    try {
      await sendRequest(`/api/cart/${user.user_id}/add`, "POST", {
        product_id: parseInt(productId),
        product_price: products[0].alt_price,
      });
      //   setError("Added to cart!");
      setOpenSuccess(true);
    } catch (err) {
      console.log(err);
      //   setError("Add to cart failed");
      setOpenFailed(true);
    }
  };

  // MUI status messages
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const styles = {
    paperContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailed(false);
    setOpenSuccess(false);
  };
  //   console.log(products);
  const disabled = user === null;
  const productsIsSet = products && products[0];
  if (status === "loading") {
    return <Loading />;
  }
  if (products?.length === 0) {
    return <Error404Page />;
  } else if (productsIsSet) {
    return (
      <Container maxWidth="lg">
        <div style={styles.paperContainer}>
          <Paper sx={{ width: "90%", padding: "120px" }}>
            <img
              width={"40%"}
              src={products[0].image_link}
              alt="product_image"
            />
            <div className="productDetails">
              <div>Product: {products[0].product_name}</div>
              <div>Product Id: {products[0].product_id}</div>
              <div>Description: {products[0].description}</div>
              <div>Material: {products[0].material_category_name}</div>
              <div>Category: {products[0].main_category_name}</div>
              <div>Lead time: {products[0].leadtime} days</div>
              <div>
                Dimensions: {products[0].product_dimen_x}cm x{" "}
                {products[0].product_dimen_y}cm x {products[0].product_dimen_z}
                cm
              </div>
              <div>Price: ${products[0].price}</div>
              {products[0].price === products[0].alt_price ? (
                <></>
              ) : (
                `Discounted price: $${products[0].alt_price}`
              )}
              {isValidWebsite ? (
                <div>
                  Datasheet:{" "}
                  <Link
                    to={products[0].datasheet}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Datasheet
                  </Link>
                </div>
              ) : (
                <></>
              )}

              {products[0].product_active ? (
                <></>
              ) : (
                <div>Product Discontinued</div>
              )}
            </div>
            <div>
              <button
                className="addToCartBtn"
                disabled={disabled}
                onClick={handleAddToCart}
              >
                <div>Add To Cart</div>
              </button>
              <span>{error}</span>
            </div>
            <Snackbar
              open={openSuccess}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Added to cart
              </Alert>
            </Snackbar>
            <Snackbar
              open={openFailed}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Something went wrong. Try refreshing the page.
              </Alert>
            </Snackbar>
          </Paper>
        </div>
      </Container>
    );
  }
}
