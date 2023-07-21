import { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";
import {
  getUser,
  getUserDetails,
  updateUserDetails,
} from "../../utilities/users-service";
import AccountNavBar from "../../Components/AccountNavBar";
import Loading from "../../Components/Loading";

export default function AccountPage({ user }) {
  const [user1, setUser1] = useState("");
  const [profileContact, setProfileContact] = useState("");
  const [profileUserAddressLine1, setProfileUserAddressLine1] = useState("");
  const [profileUserAddressLine2, setProfileUserAddressLine2] = useState("");
  const [profileUserCity, setProfileUserCity] = useState("");
  const [profileUserCountry, setProfileUserCountry] = useState("");
  const [profileUserPostalCode, setProfileUserPostalCode] = useState("");
  const [account, setProfileAccount] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const loggedInUser = getUser();
    setUser1(loggedInUser);
  }, []);

  const handleContactChange = (event) => {
    setProfileContact(event.target.value);
  };
  const handleAddress1Change = (event) => {
    setProfileUserAddressLine1(event.target.value);
  };
  const handleAddress2Change = (event) => {
    setProfileUserAddressLine2(event.target.value);
  };
  const handleCityChange = (event) => {
    setProfileUserCity(event.target.value);
  };
  const handleCountryChange = (event) => {
    setProfileUserCountry(event.target.value);
  };
  const handlePostalChange = (event) => {
    setProfileUserPostalCode(event.target.value);
  };

  useEffect(() => {
    setStatus("loading");
    try {
      const sendFormData = { ...user1 };
      if (Object.keys(sendFormData).length === 0) {
        // console.log("empty obj");
      } else {
        delete sendFormData.user_image;
        delete sendFormData.user_name;
        delete sendFormData.user_type;
        console.log(sendFormData);
        const fetchData = async () => {
          let {
            user_address_line1,
            user_address_line2,
            user_contact,
            user_city,
            user_country,
            user_postal_code,
            account,
          } = await getUserDetails(sendFormData);
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
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  }, [user1]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const detailPayload = {
      payloadAccount: account,
      payloadContact: profileContact,
      payloadAddress1: profileUserAddressLine1,
      payloadAddress2: profileUserAddressLine2,
      payloadCity: profileUserCity,
      payloadCountry: profileUserCountry,
      payloadPostal: profileUserPostalCode,
    };
    console.log(detailPayload);
    await updateUserDetails(detailPayload);
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <AccountNavBar />
      Account Page
      {/* {JSON.stringify(user1)}
      Line1:{JSON.stringify(profileUserAddressLine1)}
      Line2:{JSON.stringify(profileUserAddressLine2)}
      City:{JSON.stringify(profileUserCity)}
      Country:{JSON.stringify(profileUserCountry)}
      Contact:{JSON.stringify(profileContact)}
      Postal Code:{JSON.stringify(profileUserPostalCode)} */}
      <fieldset className="profile-container">
        <form onSubmit={handleSubmit}>
          <label>
            Address 1:
            <input
              className="profile-box"
              value={profileUserAddressLine1}
              type="text"
              onChange={handleAddress1Change}
            ></input>
          </label>
          <label>
            Address 2:
            <input
              className="profile-box"
              type="text"
              value={profileUserAddressLine2}
              onChange={handleAddress2Change}
            ></input>
          </label>
          <label>
            City:
            <input
              className="profile-box"
              type="text"
              value={profileUserCity}
              onChange={handleCityChange}
            ></input>
          </label>
          <label>
            Country:
            <input
              className="profile-box"
              type="text"
              value={profileUserCountry}
              onChange={handleCountryChange}
            ></input>
          </label>
          <label>
            Postal Code:
            <input
              className="profile-box"
              type="number"
              value={profileUserPostalCode}
              onChange={handlePostalChange}
            ></input>
          </label>
          <label>
            Contact:
            <input
              className="profile-box"
              type="number"
              value={profileContact}
              onChange={handleContactChange}
            ></input>
          </label>
          <button className="user-submit-button">Submit</button>
        </form>
      </fieldset>
    </>
  );
}
