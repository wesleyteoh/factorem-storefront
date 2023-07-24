import { useState } from "react";
import sendRequest from "../../utilities/send-request";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CartItems({
  product,
  price,
  quantity,
  imgLink,
  productId,
  cartId,
  setCartChanged,
  userName,
  userId,
  productActive,
  email,
  // onProductQtyChange,
}) {
  const handleRemoveItem = async (event) => {
    // console.log("productId", productId);
    // console.log("cartId", cartId);
    // console.log("userId", userId);
    // console.log("HANDLE REMOVE ITEM CLICKED");
    event.preventDefault();
    try {
      await sendRequest(`/api/cart/${userId}/deleteOne`, "DELETE", {
        order_id: parseInt(cartId),
        product_id: productId,
      });
    } catch (err) {
      console.log(err);
    }
    setCartChanged((prev) => !prev);
  };
  const [productQty, setProductQty] = useState(parseInt(quantity));

  const handleQtyChange = (event) => {
    event.preventDefault();

    if (
      !isNaN(event.target.value) &&
      // Set minimum at 1 and maximum at 10000
      event.target.value >= 1 &&
      event.target.value <= 10000
    ) {
      setProductQty(event.target.value);
      // onProductQtyChange(event.target.value);
    }
  };
  const handleUpdateQty = async (event) => {
    console.log("QTY", productQty);
    console.log("email", email);
    console.log("user", userName);
    console.log("orderId", cartId);
    console.log("productId", productId);
    event.preventDefault();
    try {
      await sendRequest(`/api/cart/${userId}/update`, "PUT", {
        user: userName,
        email: email,
        orderQty: productQty,
        orderId: cartId,
        productId: productId,
      });
      setOpenSuccess(true);
    } catch (err) {
      console.log(err);
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

  // const disabledMinus = quantity === 1;
  // const disabledAdd = quantity === 10000;
  console.log("productId", productId);
  if (productId === null) {
    return <div>No items in cart!</div>;
  } else
    return (
      <>
        <div className="flex justify-between items-center p-3">
          <div className="flex gap-2">
            <img
              className="h-28 rounded transform hover:scale-105 transition"
              src={imgLink}
              alt={product}
              width="20%"
            />
            <div className="flex flex-col justify-between">
              <div className="font-bold text-lg">{product}</div>
              <div className="text-gray-900 font-semibold">${price}</div>
              <div className="text-gray-500">
                Quantity:{" "}
                <input
                  type="number"
                  min="1"
                  max="10000"
                  onChange={handleQtyChange}
                  value={productQty}
                ></input>
                {/* <strong>{quantity}</strong> */}
                <button onClick={handleUpdateQty}>Update</button>
              </div>
              {productActive ? (
                <></>
              ) : (
                <div style={{ color: "red", fontWeight: "bold" }}>
                  Product Discontinued
                </div>
              )}
              <button onClick={handleRemoveItem}>Remove</button>
            </div>
          </div>
          <div className="flex gap-4">
            {/* <button
              disabled={disabledMinus}
              //   onClick={() => decrease(id)}
              className="rounded-full h-8 w-8 flex items-center justify-center text-2xl border cursor-buttonointer transform hover:scale-125 transition"
            >
              -
            </button>

            <button
              disabled={disabledAdd}
              //   onClick={() => increase(id)}
              className="rounded-full h-8 w-8 flex items-center justify-center text-2xl border cursor-pointer transform hover:scale-125 transition"
            >
              +
            </button> */}
          </div>
          <p className="text-lg font-semibold">
            ${(price * productQty).toFixed(2)}
          </p>
        </div>
        {/* ); */}
        {/* }; */}
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
            Update Quantity Successful
          </Alert>
        </Snackbar>
        <Snackbar
          open={openFailed}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Change failed
          </Alert>
        </Snackbar>
      </>
    );
}
