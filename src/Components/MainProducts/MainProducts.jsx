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
      {/* <div className="flex"> */}
      <div className="productContainer">
        <img
          width={"20%"}
          className="productImage"
          src={`${imageUrl}`}
          alt="imagename"
        />
        <div className="flex flex-wrap mt-3">
          <Link to={`/products/${id}`} className="product-name">
            {name}
          </Link>
          <div className="product-price">${price}</div>
          <div className="product-altPrice">
            {altprice === price ? "" : `$${altprice}`}
          </div>
          <p>Material: {material}</p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
