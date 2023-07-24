import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../../utilities/users-service";
import Loading from "../../Components/Loading";
import sendRequest from "../../utilities/send-request";
import { Link } from "react-router-dom";
import Error404Page from "../Error404Page/Error404Page";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
      <>
        {/* product page {productId}
        user:{JSON.stringify(user.user_id)}
        <div>{JSON.stringify(user)}</div> */}
        {/* Products: {JSON.stringify(products)} */}
        <img width={"30%"} src={products[0].image_link} alt="product_image" />
        <div>Product: {products[0].product_name}</div>
        <div>Product Id: {products[0].product_id}</div>
        <div>Description: {products[0].description}</div>
        <div>Material: {products[0].material_category_name}</div>
        <div>Category: {products[0].main_category_name}</div>
        <div>Lead time: {products[0].leadtime} days</div>
        <div>
          Dimensions: {products[0].product_dimen_x}cm x{" "}
          {products[0].product_dimen_y}cm x {products[0].product_dimen_z}cm
        </div>
        <div>Price: ${products[0].price}</div>
        {products[0].price === products[0].alt_price ? (
          <></>
        ) : (
          `Discounted price: $${products[0].alt_price}`
        )}
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
        {products[0].product_active ? <></> : <div>Product Discontinued</div>}
        <div>
          <button disabled={disabled} onClick={handleAddToCart}>
            Add To Cart
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
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Something went wrong. Try refreshing the page.
          </Alert>
        </Snackbar>
      </>
    );
  }
}
