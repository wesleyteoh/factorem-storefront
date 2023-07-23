import { Link } from "react-router-dom";

export default function AccountNavBar() {
  return (
    <>
      <header className="account-nav-header">
        <div>
          <ul className="account-nav-bar">
            <li>
              <Link to="/users/profile/">Profile</Link>
            </li>
            <li>
              <Link to="/users/setting">Settings</Link>
            </li>
            <li>
              <Link to="/users/history">Past Orders</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
