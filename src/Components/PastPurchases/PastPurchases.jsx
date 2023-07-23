export default function PastPurchases({ purchases }) {
  return (
    <>
      {/* Pastpurchases */}
      {/* {JSON.stringify(purchases)} */}
      <div>
        {purchases.products.map((item) => (
          <div key={item.product_id}>
            <fieldset>
              {/* <div>{JSON.stringify(item.product_active)}</div> */}
              <img width="15%" src={item.image_link} alt="product_image" />
              <div>Product name: {item.product_name}</div>
              <div>Material: {item.material_category_name}</div>
              <div>Unit Price: ${item.unit_price}</div>
              <div>Order quantity: {item.order_quantity}</div>
              <div>Lead time: {item.leadtime} days</div>
              <div>Status: {item.shipping_type}</div>
              {item.product_active ? <></> : <div>DISCONTINUED</div>}
              <div>
                Total Price: $
                {(item.unit_price * item.order_quantity).toFixed(2)}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
    </>
  );
}
