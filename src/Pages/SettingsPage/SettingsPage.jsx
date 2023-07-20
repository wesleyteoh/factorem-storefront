import { useEffect, useState } from "react";
import AccountNavBar from "../../Components/AccountNavBar";
import { getUser } from "../../utilities/users-service";

export default function SettingsPage() {
  const [user1, setUser1] = useState("");
  const [passData, setPassData] = useState({
    confirm: "",
    password: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    const loggedInUser = getUser();
    setUser1(loggedInUser);
  }, []);
  function handleChangePass(e) {
    setPassData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  const disabled =
    passData.confirm !== "" && passData.confirm === passData.password;
  useEffect(() => {
    if (disabled)
      setError("Current Password and New Password cannot be the same.");
    if (!disabled) setError("");
  }, [disabled]);

  const handleSubmitPassword = () => {
    console.log("passData", passData);
  };
  return (
    <>
      <AccountNavBar />
      {JSON.stringify(user1)}
      <h1>Change My Password</h1>
      <form onSubmit={handleSubmitPassword}>
        <div className="currpass">
          <label>
            Current Password:
            <input
              className="forminput"
              minLength="8"
              type="password"
              name="confirm"
              value={passData.confirm}
              onChange={handleChangePass}
              required
            ></input>
          </label>
          <span>{error}</span>
        </div>
        <div className="newpass">
          <label>
            New Password:
            <input
              className="forminput"
              minLength="8"
              type="password"
              name="password"
              value={passData.password}
              onChange={handleChangePass}
              required
            ></input>
          </label>
        </div>
        <button disabled={disabled}>Submit</button>
      </form>
    </>
  );
}
