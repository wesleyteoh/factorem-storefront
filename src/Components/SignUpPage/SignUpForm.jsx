import { useState } from "react";

export default function SignUpForm() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    errorMessage: "",
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
  const disable = newUser.password !== newUser.confirm;
  //   const handleSubmit = {};
  //Navigate to next page which is to enter user address else skip

  return (
    <div>
      <div className="signUpForm">
        {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
        <form autoComplete="off">
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
