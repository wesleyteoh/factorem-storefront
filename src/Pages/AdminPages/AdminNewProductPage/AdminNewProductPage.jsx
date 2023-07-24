import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
export default function AdminNewProductPage() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState();
  const [altPrice, setAltPrice] = useState();
  const [imageLink, setImageLink] = useState("");
  const [stockAvail, setStockAvail] = useState("");
  const [description, setDescription] = useState("");
  const [productActive, setProductActive] = useState(true);
  const [material, setMaterial] = useState("");
  const [productDimenX, setProductDimenX] = useState();
  const [productDimenY, setProductDimenY] = useState();
  const [productDimenZ, setProductDimenZ] = useState();
  const [datasheet, setDatasheet] = useState("");
  const [leadtime, setLeadtime] = useState();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailed(false);
    setOpenSuccess(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const detailPayload = {
    //   payloadAccount: account,
    //   payloadContact: profileContact,
    //   payloadAddress1: profileUserAddressLine1,
    //   payloadAddress2: profileUserAddressLine2,
    //   payloadCity: profileUserCity,
    //   payloadCountry: profileUserCountry,
    //   payloadPostal: profileUserPostalCode,
    // };
    // console.log(detailPayload);
    try {
      // await updateUserDetails(detailPayload);
      // setOpenSuccess(true);
    } catch (err) {
      // console.log(err);
      // setOpenFailed(true);
    }
  };

  // Start of onchanges
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleAltPriceChange = (event) => {
    setAltPrice(event.target.value);
  };
  const handleImageLinkChange = (event) => {
    setImageLink(event.target.value);
  };
  const handleStockChange = (event) => {
    setStockAvail(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleProductActive = (event) => {
    setProductActive(event.target.value);
  };
  const handleProductDimenX = (event) => {
    setProductDimenX(event.target.value);
  };

  // end of onchanges
  return (
    <>
      <div>New Product Page</div>

      <fieldset className="profile-container">
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              className="profile-box"
              value={productName}
              type="text"
              onChange={handleProductNameChange}
            ></input>
          </label>
          <label>
            Price: $
            <input
              className="profile-box"
              type="number"
              value={price}
              onChange={handlePriceChange}
            ></input>
          </label>
          <label>
            Alt Price: $
            <input
              className="profile-box"
              type="number"
              value={altPrice}
              onChange={handleAltPriceChange}
            ></input>
          </label>
          <label>
            Image link:
            <input
              className="profile-box"
              type="text"
              value={imageLink}
              onChange={handleImageLinkChange}
            ></input>
          </label>
          <label>
            Stock Available:
            <input
              className="profile-box"
              type="number"
              value={stockAvail}
              onChange={handleStockChange}
            ></input>
          </label>
          <label>
            Product Description:
            <input
              className="profile-box"
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            ></input>
          </label>
          <label>
            Product dimension X:
            <input
              className="profile-box"
              type="number"
              value={productDimenX}
              onChange={handleProductDimenX}
            ></input>
          </label>
          <button className="user-submit-button">Submit</button>
        </form>
      </fieldset>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Change successful
        </Alert>
      </Snackbar>
      <Snackbar open={openFailed} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Change failed
        </Alert>
      </Snackbar>
    </>
  );
}
