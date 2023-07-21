import { Link } from "react-router-dom";

export default function MainProducts({
  name,
  price,
  description,
  imageUrl,
  stock,
  altprice,
  material,
  id,
}) {
  return (
    <>
      <div className="flex">
        <div className="flex-auto">
          <img
            className="rounded-xl h-64"
            src={`${imageUrl}`}
            alt="imagename"
          />
          <div className="flex flex-wrap mt-3">
            <Link
              to={`/products/${id}`}
              className="flex-auto text-xl font-semibold"
            >
              {name}
            </Link>
            <div className="text-xl font-semibold">${price}</div>
            <div className="text-xl font-semibold">
              {altprice === price ? "" : `$${altprice}`}
            </div>
            <p>Material: {material}</p>
            <p className="w-full flex-none text-medium text-gray-500 mt-1">
              Description: {description}
            </p>
            {/* <p>Stock Available:{stock}</p> */}
            {/* {user && renderUserInfo()} */}
          </div>
          <div className="flex space-x-3 font-medium items-center justify-between mt-6">
            <button
              // onClick={handleCart}
              className="addtocart_button"
              type="button"
            >
              Add to Cart
              {/* {addedToCart ? <Added /> : 'Add to cart'} */}
            </button>
            {/* <button
            onClick={handleWishlist}
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md border-gray-200 border"
            type="button"
            aria-label="like">
            <Heart color={wishlisted ? 'red' : 'gray'} />
          </button> */}
            {/* {reviews?.length > 0 && renderReviewsInfo()} */}
          </div>
        </div>
      </div>
      {/* ); */}
    </>
  );
}
