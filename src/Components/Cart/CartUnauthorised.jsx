import { Link } from "react-router-dom";

export default function CartUnauthorised() {
  return (
    <>
      Unauthorised
      <div>Check that you are logged in. Click here to return to home page</div>
      <Link to={"/"}>Home Page</Link>
    </>
  );
}
