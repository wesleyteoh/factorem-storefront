import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import Loading from "../../../Components/Loading";
import sendRequest from "../../../utilities/send-request";
export default function AdminNewProductPage() {
  const [status, setStatus] = useState("idle");
  // For populating dropdown
  const [materials, setMaterials] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedMaterialCategory, setSelectedMaterialCategory] =
    useState(null);
  // For entry fields
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
  // For regex
  const [isValidWebsite, setIsValidWebsite] = useState(true);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  async function getMaterialCategory() {
    try {
      const materials = await sendRequest(`/products/materials`, "GET");
      setMaterials(materials);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  }
  const handleMainCategoryChange = (event) => {
    const selectedMainCategoryName = event.target.value;
    const selectedMainCategory = materials.find(
      (mainCategory) =>
        mainCategory.main_category_name === selectedMainCategoryName
    );
    setSelectedMainCategory(selectedMainCategory);
    setSelectedMaterialCategory(null);
  };

  const handleMaterialCategoryChange = (event) => {
    const selectedMaterialCategoryID = event.target.value;
    const selectedMaterialCategory =
      selectedMainCategory.material_categories.find(
        (materialCategory) =>
          materialCategory.material_category_id ===
          parseInt(selectedMaterialCategoryID, 10)
      );
    setSelectedMaterialCategory(selectedMaterialCategory);
  };
  useEffect(() => {
    getMaterialCategory();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailed(false);
    setOpenSuccess(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("selectedMainCategory", selectedMainCategory.main_category_id);
    console.log(
      "selectedMaterialCategory",
      selectedMaterialCategory.material_category_id
    );
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
    // Ref for regex format: https://www.makeuseof.com/regular-expressions-validate-url/
    const websiteRegex =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/;
    setIsValidWebsite(websiteRegex.test(event.target.value));
  };
  const handleStockChange = (event) => {
    setStockAvail(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleProductDimenX = (event) => {
    setProductDimenX(event.target.value);
  };

  const disabled = selectedMaterialCategory === null;

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error fetching data. Please try again later.</div>;
  }
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
          {!isValidWebsite && (
            <p style={{ color: "red" }}>Invalid website URL</p>
          )}
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
          {/* Start of material dropdown */}
          <div>
            <label htmlFor="mainCategory">Select Main Category:</label>
            <select
              id="mainCategory"
              value={
                selectedMainCategory
                  ? selectedMainCategory.main_category_name
                  : ""
              }
              onChange={handleMainCategoryChange}
            >
              <option value="">Select a Main Category</option>
              {materials.map((mainCategory) => (
                <option
                  key={mainCategory.main_category_id}
                  value={mainCategory.main_category_name}
                >
                  {mainCategory.main_category_name}
                </option>
              ))}
            </select>

            {selectedMainCategory && (
              <div>
                <label htmlFor="materialCategory">
                  Select Material Category:
                </label>
                <select
                  id="materialCategory"
                  value={
                    selectedMaterialCategory
                      ? selectedMaterialCategory.material_category_id
                      : ""
                  }
                  onChange={handleMaterialCategoryChange}
                >
                  <option value="">Select a Material Category</option>
                  {selectedMainCategory.material_categories.map(
                    (materialCategory) => (
                      <option
                        key={materialCategory.material_category_id}
                        value={materialCategory.material_category_id}
                      >
                        {materialCategory.material_category_name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
          </div>
          {/* End of material dropdown */}
          <button disabled={disabled} className="user-submit-button">
            Submit
          </button>
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
