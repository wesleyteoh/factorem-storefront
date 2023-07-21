import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { getUser, getUserDetails } from "../../utilities/users-service";
import { useNavigate } from "react-router";
import CartItems from "../../Components/Cart/CartItems";
import CartSummary from "../../Components/Cart/CartSummary";
import Loading from "../../Components/Loading";

export default function CartPage() {
  const [cartContent, setCartContent] = useState(null);
  const [user, setUser] = useState(getUser());
  const [profileUserAddressLine1, setProfileUserAddressLine1] = useState("");
  const [profileUserAddressLine2, setProfileUserAddressLine2] = useState("");
  const [profileUserCity, setProfileUserCity] = useState("");
  const [profileUserCountry, setProfileUserCountry] = useState("");
  const [profileUserPostalCode, setProfileUserPostalCode] = useState("");
  const [account, setProfileAccount] = useState("");
  const [profileContact, setProfileContact] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("loading");
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
      } catch (err) {
        console.log(err);
      }
    }
    const payloadDetail = {
      user_email: user.user_email,
      user_id: user.user_id,
    };
    try {
      const getAddress = async () => {
        let {
          user_address_line1,
          user_address_line2,
          user_contact,
          user_city,
          user_country,
          user_postal_code,
          account,
        } = await getUserDetails(payloadDetail);
        setStatus("success");
        if (user_address_line1 == null) {
          user_address_line1 = "";
        }
        if (user_address_line2 == null) {
          user_address_line2 = "";
        }
        if (user_city == null) {
          user_city = "";
        }
        if (user_country == null) {
          user_country = "";
        }
        if (user_postal_code == null) {
          user_postal_code = "";
        }
        setProfileContact(user_contact);
        setProfileUserAddressLine1(user_address_line1);
        setProfileUserAddressLine2(user_address_line2);
        setProfileUserCity(user_city);
        setProfileUserCountry(user_country);
        setProfileUserPostalCode(user_postal_code);
        setProfileAccount(account);
      };

      getAddress();
    } catch (err) {
      console.log(err);
    }
    console.log("user", payloadDetail);
  }, []);

  const handleAddtoCart = async (event) => {
    event.preventDefault();
    console.log(cartContent[0].order_id);
    try {
      const checkOutRes = await sendRequest(
        `/api/cart/${user.user_id}/checkout`,
        "POST",
        {
          email: user.user_email,
          order_id: cartContent[0].order_id,
        }
      );
      console.log(checkOutRes);
      if (checkOutRes === "checkout success") {
        console.log("ok");
        navigate("/users/history");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (status === "loading") {
    return <Loading />;
  }
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
          <CartSummary
            cartContent={cartContent}
            profileUserAddressLine1={profileUserAddressLine1}
            profileUserAddressLine2={profileUserAddressLine2}
            profileUserCity={profileUserCity}
            profileUserCountry={profileUserCountry}
            profileUserPostalCode={profileUserPostalCode}
            profileContact={profileContact}
          />
          <button>Order</button>
        </form>
      </fieldset>
    </>
  );
}
