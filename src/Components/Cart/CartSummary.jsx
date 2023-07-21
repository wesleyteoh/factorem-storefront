export default function CartSummary({ cartContent }) {
  let itemCount = 0;
  let totalPrice = 0;
  for (let i = 0; i < cartContent?.length; i++) {
    itemCount = itemCount + cartContent[i].order_quantity;
    totalPrice =
      totalPrice + cartContent[i].order_quantity * cartContent[i].unit_price;
  }
  return (
    <>
      {/* {JSON.stringify(cartContent)} */}
      <div>Items: {itemCount}</div>
      <div>Total amount: ${totalPrice}</div>
    </>
  );
}
