import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../utilities/users-api";
import * as usersService from "../../utilities/users-service";

export default function SignUpForm({ setUser }) {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    errorMessage: "",
    contact: "",
  });

  const [pwErrorMessage, setPwErrorMessage] = useState("");
  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
      error: "",
    });
    console.log(newUser);
  };
  useEffect(() => {
    if (newUser.password !== newUser.confirm) {
      setPwErrorMessage("Password and Confirm Password do not match.");
    } else {
      setPwErrorMessage("");
    }
  }, [newUser.password, newUser.confirm]);
  const disable = newUser.password !== newUser.confirm;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { ...newUser };
      delete formData.errorMessage;
      delete formData.confirm;
      const user = await usersService.signUp(formData);
      //   const user = await signUp(formData);
      console.log("user", user);
      setUser(user);

      if (user) {
        console.log("success signup");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setNewUser({ ...newUser, errorMessage: "Sign Up Failed. Try Again." });
    }
  };
  //Navigate to next page which is to enter user address else skip

  return (
    <div>
      <div className="signUpForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* <form autoComplete="off"> */}
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Name"
            value={newUser.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <label>Contact number</label>
          <input
            type="number"
            name="contact"
            className="input"
            placeholder="Contact number"
            value={newUser.contact}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={newUser.password}
            onChange={handleChange}
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm"
            className="input"
            placeholder="Confirm Password"
            value={newUser.confirm}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit" disabled={disable}>
            Sign Up
          </button>
        </form>
      </div>
      <br />
      <p className="error-message">
        {disable ? pwErrorMessage : newUser.errorMessage}
      </p>
    </div>
  );
}
