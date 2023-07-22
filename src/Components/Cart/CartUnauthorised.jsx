import { Link } from "react-router-dom";

export default function CartUnauthorised() {
  return (
    <>
      Unauthorised
      <div>Do not open a new tab. Click here to return to home page</div>
      <Link to={"/"}>Home Page</Link>
    </>
  );
}
