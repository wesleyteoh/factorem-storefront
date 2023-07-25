import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import Loading from "../../../Components/Loading";
import sendRequest from "../../../utilities/send-request";
import { getUser } from "../../../utilities/users-service";
export default function AdminNewProductPage() {
  const [user, setUser] = useState(getUser());
  const [status, setStatus] = useState("idle");
  // For populating dropdown
  const [materials, setMaterials] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedMaterialCategory, setSelectedMaterialCategory] =
    useState(null);
  // For entry fields
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(null);
  const [altPrice, setAltPrice] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [stockAvail, setStockAvail] = useState(null);
  const [description, setDescription] = useState("");
  // const [productActive, setProductActive] = useState(true);
  const [material, setMaterial] = useState("");
  const [productDimenX, setProductDimenX] = useState(null);
  const [productDimenY, setProductDimenY] = useState(null);
  const [productDimenZ, setProductDimenZ] = useState(null);
  const [datasheet, setDatasheet] = useState("");
  const [leadtime, setLeadtime] = useState(null);
  // For regex
  const [isValidWebsite, setIsValidWebsite] = useState(true);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  async function getMaterialCategory() {
    try {
      const materials = await sendRequest(`/api/products/materials`, "GET");
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
    console.log("userId", user.user_id);
    console.log("user_email", user.user_email);
    console.log("product_name", productName);
    console.log("price", price);
    console.log("altPrice", altPrice);
    console.log("imagelink", imageLink);
    console.log("stock", stockAvail);
    console.log("description", description);
    console.log("selectedMainCategory", selectedMainCategory.main_category_id);
    console.log(
      "selectedMaterialCategory",
      selectedMaterialCategory.material_category_id
    );
    console.log("product_dimen_x", productDimenX);
    console.log("product_dimen_y", productDimenY);
    console.log("product_dimen_z", productDimenZ);
    console.log("datasheet", datasheet);
    console.log("leadtime", leadtime);

    // try {
    const getCart = async () => {
      try {
        const addProductRes = await sendRequest(
          `/api/adminSide/addNewProduct`,
          "POST",
          {
            email: user.user_email,
            userId: parseInt(user.user_id),
            product_name: productName,
            price: price,
            alt_price: altPrice,
            image_link: imageLink,
            stockAvail: stockAvail,
            description: description,
            mainCategoryId: selectedMainCategory.main_category_id,
            materialNameId: selectedMaterialCategory.material_category_id,
            product_dimen_x: productDimenX,
            product_dimen_y: productDimenY,
            product_dimen_z: productDimenZ,
            datasheet: datasheet,
            leadtime: leadtime,
          }
        );
        console.log(addProductRes);
        setOpenSuccess(true);
        setProductName("");
        setPrice(null);
        setAltPrice(null);
        setImageLink("");
        setStockAvail(null);
        setDescription("");
        setDatasheet("");
        setProductDimenX(null);
        setProductDimenY(null);
        setProductDimenZ(null);
        setLeadtime(null);
        // getMaterialCategory();
      } catch (err) {
        console.log(err);
        setOpenFailed(true);
      }
    };
    getCart();
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
  const handleProductDimenY = (event) => {
    setProductDimenY(event.target.value);
  };
  const handleProductDimenZ = (event) => {
    setProductDimenZ(event.target.value);
  };
  const handleLeadtime = (event) => {
    setLeadtime(event.target.value);
  };
  const handleDatasheet = (event) => {
    setDatasheet(event.target.value);
  };

  const disabled =
    selectedMaterialCategory === null ||
    productName === "" ||
    price === null ||
    altPrice === null ||
    imageLink === "" ||
    stockAvail === null ||
    description === "" ||
    datasheet === "" ||
    productDimenX === null ||
    productDimenY === null ||
    productDimenZ === null ||
    leadtime === null;

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
      {/* <div>{JSON.stringify(user)}</div> */}
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
              value={price !== null ? price : ""}
              onChange={handlePriceChange}
            ></input>
          </label>
          <label>
            Alt Price: $
            <input
              className="profile-box"
              type="number"
              value={altPrice !== null ? altPrice : ""}
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
              value={stockAvail !== null ? stockAvail : ""}
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
            Datasheet:
            <input
              className="profile-box"
              type="text"
              value={datasheet}
              onChange={handleDatasheet}
            ></input>
          </label>
          <label>
            Product dimension X:
            <input
              className="profile-box"
              type="number"
              value={productDimenX !== null ? productDimenX : ""}
              onChange={handleProductDimenX}
            ></input>
            cm
          </label>
          <label>
            Product dimension Y:
            <input
              className="profile-box"
              type="number"
              value={productDimenY !== null ? productDimenY : ""}
              onChange={handleProductDimenY}
            ></input>
            cm
          </label>
          <label>
            Product dimension Z:
            <input
              className="profile-box"
              type="number"
              value={productDimenZ !== null ? productDimenZ : ""}
              onChange={handleProductDimenZ}
            ></input>
            cm
          </label>
          <label>
            Lead time:
            <input
              className="profile-box"
              type="number"
              value={leadtime !== null ? leadtime : ""}
              onChange={handleLeadtime}
            ></input>
            days
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
          Product add successful
        </Alert>
      </Snackbar>
      <Snackbar open={openFailed} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Product add failed
        </Alert>
      </Snackbar>
    </>
  );
}
