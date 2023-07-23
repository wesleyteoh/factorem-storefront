import { Link } from "react-router-dom";

export default function AdminHomeNavBar() {
  return (
    <>
      <header className="account-nav-header">
        <div>
          <ul className="account-nav-bar">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/admin/orders">Orders</Link>
            </li>
            {/* <li>
              <Link to="/users/history">Past Orders</Link>
            </li> */}
          </ul>
        </div>
      </header>
    </>
  );
}
