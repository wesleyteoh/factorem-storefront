import { Link } from "react-router-dom";

export default function AdminMainProducts({
  name,
  price,
  description,
  imageUrl,
  stock,
  altprice,
  material,
  id,
  material_category,
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
          <Link to={`/admin/products/${id}`} className="product-name">
            {name}
          </Link>
          <div className="product-price"> Price ${price}</div>
          <div className="product-altPrice">
            {altprice === price ? "" : `Special price: $${altprice}`}
          </div>
          <div>Category: {material_category}</div>
          <div>Material: {material}</div>
          <p></p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
