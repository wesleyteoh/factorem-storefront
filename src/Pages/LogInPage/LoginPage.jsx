import LogInForm from "../../Components/LogInPage/LogInForm";
import { Link } from "react-router-dom";

export default function LogInPage({ setUser }) {
  return (
    <div className="alignmentContainer">
      <div className="loginContainer">
        <div className="Images"></div>
        <div className="login">
          <h1>Sign In</h1>
          <LogInForm setUser={setUser} />
          <div className="signUpDetails">
            <p>
              New to Factorem? <Link to="/register">Sign up now.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
