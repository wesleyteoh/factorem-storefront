import sendRequest from "../../utilities/send-request";

export default function CartItems({
  product,
  price,
  quantity,
  imgLink,
  productId,
  cartId,
  setCartChanged,
  userId,
  productActive,
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

  const disabledMinus = quantity === 1;
  const disabledAdd = quantity === 10000;
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
                Quantity: <strong>{quantity}</strong>
              </div>
              {productActive ? <></> : <div>Product Discontinued</div>}
              <button onClick={handleRemoveItem}>Remove</button>
            </div>
          </div>
          <div className="flex gap-4">
            <button
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
            </button>
          </div>
          <p className="text-lg font-semibold">
            ${(price * quantity).toFixed(2)}
          </p>
        </div>
        {/* ); */}
        {/* }; */}
      </>
    );
}
