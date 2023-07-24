import { useEffect, useState } from "react";
import AccountNavBar from "../../Components/AccountNavBar";
import { getUser, updateUserPass } from "../../utilities/users-service";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    console.log("passData", passData);
    const payloadPassword = {
      user_id: user1.user_id,
      email: user1.user_email,
      confirm: passData.confirm,
      password: passData.password,
    };
    console.log(payloadPassword);
    try {
      const updatePwd = await updateUserPass(payloadPassword);
      console.log(updatePwd);
      //   setError("Password change success");
      setOpenSuccess(true);
    } catch (err) {
      console.log(err);
      //   setError("Incorrect password. Try again");
      setOpenFailed(true);
    }
  };
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailed(false);
    setOpenSuccess(false);
  };
  return (
    <>
      <AccountNavBar />
      {/* {JSON.stringify(user1)} */}
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
            <small>password must have a minimum length of 8</small>
          </label>
        </div>
        <button disabled={disabled}>Submit</button>
      </form>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Change successful
        </Alert>
      </Snackbar>
      <Snackbar open={openFailed} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Change failed
        </Alert>
      </Snackbar>
    </>
  );
}
