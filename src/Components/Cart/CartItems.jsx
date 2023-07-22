export default function CartItems({
  product,
  price,
  quantity,
  imgLink,
  productId,
  cartId,
  setCartChanged,
}) {
  const handleRemoveItem = async (event) => {
    console.log("productId", productId);
    console.log("cartId", cartId);
    console.log("HANDLE REMOVE ITEM CLICKED");
    event.preventDefault();
    setCartChanged((prev) => !prev);
  };
  return (
    <>
      <div className="flex justify-between items-center p-3">
        <div className="flex gap-2">
          <img
            className="h-28 rounded transform hover:scale-105 transition"
            src={imgLink}
            alt={product}
          />
          <div className="flex flex-col justify-between">
            <p className="font-bold text-lg">{product}</p>
            <p className="text-gray-900 font-semibold">${price}</p>

            <p className="text-gray-500">
              Quantity: <strong>{quantity}</strong>
            </p>
            <button onClick={handleRemoveItem}>Remove</button>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            //   onClick={() => decrease(id)}
            className="rounded-full h-8 w-8 flex items-center justify-center text-2xl border cursor-buttonointer transform hover:scale-125 transition"
          >
            -
          </button>

          <button
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
