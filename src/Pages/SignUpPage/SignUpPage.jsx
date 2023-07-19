import { Link } from "react-router-dom";
import SignUpForm from "../../Components/SignUpPage/SignUpForm";

export default function SignUpPage({ setUser }) {
  return (
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <SignUpForm setUser={setUser} />
      <div className="signInDetails">
        <p>
          Already a Factorem user? <Link to="/login">Sign in now.</Link>
        </p>
      </div>
    </div>
  );
}
