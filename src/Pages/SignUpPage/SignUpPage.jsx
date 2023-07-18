import { Link } from "react-router-dom";
import SignUpForm from "../../Components/SignUpPage/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
