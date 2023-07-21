import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { getUser } from "../../utilities/users-service";
import { useNavigate } from "react-router";
import CartItems from "../../Components/Cart/CartItems";
import CartSummary from "../../Components/Cart/CartSummary";

export default function CartPage() {
  const [cartContent, setCartContent] = useState(null);
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  useEffect(() => {
    console.log("!user", user);
    if (!user) {
      navigate("/unauthorised");
    } else {
      try {
        const getCart = async () => {
          const cartRes = await sendRequest(
            `/api/cart/${user.user_id}`,
            "POST",
            {
              email: user.user_email,
            }
          );
          setCartContent(cartRes);
        };
        getCart();
      } catch {}
    }
  }, []);

  const handleAddtoCart = async (event) => {
    event.preventDefault();
  };
  return (
    <>
      Cart Page
      <>{JSON.stringify(user)}</>
      <div>{JSON.stringify(cartContent)}</div>
      {cartContent?.map((cart) => (
        <div key={cart.order_item_id}>
          <CartItems
            product={cart.product_name}
            price={cart.unit_price}
            quantity={cart.order_quantity}
            imgLink={cart.image_link}
          />
        </div>
      ))}
      <fieldset>
        <form onSubmit={handleAddtoCart}>
          <div>Order Summary</div>
          <CartSummary cartContent={cartContent} />
          <button>Order</button>
        </form>
      </fieldset>
    </>
  );
}
