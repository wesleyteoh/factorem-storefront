import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../../utilities/users-service";
import Loading from "../../Components/Loading";
import sendRequest from "../../utilities/send-request";
import { Link } from "react-router-dom";
import Error404Page from "../Error404Page/Error404Page";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AdminProductPage() {
  const [user, setUser] = useState(getUser());
  const [products, setProducts] = useState(null);
  const { productId } = useParams();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [isValidWebsite, setIsValidWebsite] = useState(true);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [leadtime, setLeadtime] = useState(0);
  const [productDimenX, setProductDimenX] = useState(0);
  const [productDimenY, setProductDimenY] = useState(0);
  const [productDimenZ, setProductDimenZ] = useState(0);
  const [price, setPrice] = useState(0);
  const [altPrice, setAltPrice] = useState(0);
  const [dataSheet, setDatasheet] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [allowEdits, setAllowEdits] = useState(true);

  const websiteRegex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/;

  useEffect(() => {
    setStatus("loading");
    async function getProducts() {
      const products = await sendRequest(
        `/api/adminSide/one/${productId}`,
        "GET"
      );
      setProducts(products);
      setProductName(products[0].product_name);
      setDescription(products[0].description);
      setLeadtime(products[0].leadtime);
      setProductDimenX(products[0].product_dimen_x);
      setProductDimenY(products[0].product_dimen_y);
      setProductDimenZ(products[0].product_dimen_z);
      setPrice(products[0].price);
      setAltPrice(products[0].alt_price);
      setDatasheet(products[0].datasheet);
      setImageLink(products[0].image_link);
      setIsActive(products[0].product_active);

      // console.log(products[0].product_active);
      setIsValidWebsite(websiteRegex.test(products[0].datasheet));
      setStatus("success");
    }
    getProducts();

    if (user === null) {
      setError("User not found");
    }
  }, []);

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    console.log("productName", productName);
    console.log("description", description);
    console.log("leadtime", leadtime);
    console.log("productDimenX", productDimenX);
    console.log("productDimenY", productDimenY);
    console.log("productDimenY", productDimenZ);
    console.log("price", price);
    console.log("Altprice", altPrice);
    console.log("dataSheet", dataSheet);
    console.log("imageLink", imageLink);
    console.log("productId", products[0].product_id);
    console.log("active?", isActive);
    console.log(typeof isActive);
    // try {
    //   await sendRequest(`/api/cart/${user.user_id}/add`, "POST", {
    //     product_id: parseInt(productId),
    //     product_price: products[0].alt_price,
    //   });
    //   setOpenSuccess(true);
    // } catch (err) {
    //   console.log(err);
    //   setOpenFailed(true);
    // }
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
  // On changes
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleLeadtimeChange = (event) => {
    setLeadtime(event.target.value);
  };
  const handleProductDimenXChange = (event) => {
    setProductDimenX(event.target.value);
  };
  const handleProductDimenYChange = (event) => {
    setProductDimenY(event.target.value);
  };
  const handleProductDimenZChange = (event) => {
    setProductDimenZ(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleAltPriceChange = (event) => {
    setAltPrice(event.target.value);
  };
  const handleDataSheetChange = (event) => {
    setDatasheet(event.target.value);
  };
  const handleImageLinkChange = (event) => {
    setImageLink(event.target.value);
  };
  const handleActiveChange = (event) => {
    setIsActive(JSON.parse(event.target.value));
  };
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
        <button onClick={() => setAllowEdits((prev) => !prev)}>
          Make edits
        </button>
        {JSON.stringify(allowEdits)}
        <form onSubmit={handleSubmitChange}>
          <label>
            Product name:
            <input
              className="profile-box"
              value={productName}
              type="text"
              onChange={handleProductNameChange}
              disabled={allowEdits}
            ></input>
          </label>
          <label>
            Description:
            <input
              className="profile-box"
              value={description}
              type="text"
              onChange={handleDescriptionChange}
              disabled={allowEdits}
            ></input>
          </label>
          <label>
            Lead time:
            <input
              className="profile-box"
              value={leadtime}
              type="text"
              onChange={handleLeadtimeChange}
              disabled={allowEdits}
            ></input>
            days
          </label>
          <label>
            Dimension X:
            <input
              className="profile-box"
              value={productDimenX}
              type="text"
              onChange={handleProductDimenXChange}
              disabled={allowEdits}
            ></input>
            cm
          </label>
          <label>
            Dimension Y:
            <input
              className="profile-box"
              value={productDimenY}
              type="text"
              onChange={handleProductDimenYChange}
              disabled={allowEdits}
            ></input>
            cm
          </label>
          <label>
            Dimension Z:
            <input
              className="profile-box"
              value={productDimenZ}
              type="text"
              onChange={handleProductDimenZChange}
              disabled={allowEdits}
            ></input>
            cm
          </label>
          <label>
            Price: $
            <input
              className="profile-box"
              value={price}
              type="text"
              onChange={handlePriceChange}
              disabled={allowEdits}
            ></input>
          </label>
          <label>
            Alt Price $:
            <input
              className="profile-box"
              value={altPrice}
              type="text"
              onChange={handleAltPriceChange}
              disabled={allowEdits}
            ></input>
          </label>
          <label>
            Datasheet:
            <input
              className="profile-box"
              value={dataSheet}
              type="text"
              onChange={handleDataSheetChange}
              disabled={allowEdits}
            ></input>
          </label>
          <label>
            Image Link:
            <input
              className="profile-box"
              value={imageLink}
              type="text"
              onChange={handleImageLinkChange}
              disabled={allowEdits}
            ></input>
          </label>
          Product Active:{" "}
          <select
            disabled={allowEdits}
            value={isActive}
            onChange={handleActiveChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </form>

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

        {products[0].product_active ? <></> : <div>Product Discontinued</div>}
        <div>
          <button disabled={disabled} onClick={handleSubmitChange}>
            Submit change
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
            Change successful
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
