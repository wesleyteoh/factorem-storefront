import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
export default function LogInForm({ setUser }) {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
    setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await usersService.login(userLogin);
      console.log("user", user);
      setUser(user);

      if (user) {
        console.log("success login");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(
        "Log In Failed. Check if email and password are correct."
      );
    }
  }

  return (
    <div>
      <div className="loginForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="email"
              className="input"
              value={userLogin.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              className="input"
              value={userLogin.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}
