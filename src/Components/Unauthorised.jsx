import { Link } from "react-router-dom";

export default function Unauthorised() {
  return (
    <>
      Unauthorised
      <div>Check that you are logged in or return to home page</div>
      <Link to={"/"}>Home Page</Link>
    </>
  );
}
