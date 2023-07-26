import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminAllProductsComp({
  name,
  price,
  description,
  imageUrl,
  stock,
  altprice,
  material,
  id,
  material_category,
  productActive,
}) {
  const [productPrice, setProductPrice] = useState(parseInt(price).toFixed(2));
  const [productAltPrice, setProductAltPrice] = useState(
    parseInt(altprice).toFixed(2)
  );

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

          {/* <div className="product-name"> {name}</div> */}
          <div className="product-id"> Id: {id}</div>
          <div className="product-price"> Price ${productPrice}</div>
          <div className="product-altPrice">
            {altprice === price ? "" : `Special price: $${productAltPrice}`}
          </div>
          <div>Category: {material_category}</div>
          <div>Material: {material}</div>
          <div>Active?: {JSON.stringify(productActive)}</div>
          <p></p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
