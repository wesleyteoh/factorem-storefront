// import { useNavigate } from "react-router";

import { useEffect } from "react";

export default function CartSummary({
  cartContent,
  setTotalItems,
  profileUserAddressLine1,
  profileUserAddressLine2,
  profileUserCity,
  profileUserCountry,
  profileUserPostalCode,
  profileContact,
}) {
  // const navigate = useNavigate();

  let itemCount = 0;
  let totalPrice = 0;
  for (let i = 0; i < cartContent?.length; i++) {
    itemCount = itemCount + cartContent[i].order_quantity;
    totalPrice =
      totalPrice + cartContent[i].order_quantity * cartContent[i].unit_price;
  }
  useEffect(() => {
    setTotalItems(itemCount);
  });
  // const handleToAddress = (event) => {
  //   event.preventDefault();
  //   navigate("/users/profile");
  // };
  return (
    <>
      {/* <div>
        Please confirm the following Address
        <div>Address 1: {profileUserAddressLine1}</div>
        <div>Address 2: {profileUserAddressLine2}</div>
        <div>Postal Code: {profileUserPostalCode}</div>
        <div>Contact: {profileContact}</div>
        <div>City: {profileUserCity}</div>
        <div>Country: {profileUserCountry}</div>
      </div>
      <button onClick={handleToAddress}>Change Address</button> */}
      {/* {JSON.stringify(cartContent)} */}
      <div>Items: {itemCount}</div>
      <div>Total amount: ${totalPrice.toFixed(2)}</div>
    </>
  );
}
