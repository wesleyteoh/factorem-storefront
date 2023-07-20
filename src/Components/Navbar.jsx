import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as userService from "../utilities/users-service";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogOut = () => {
    userService.logOut();
    setUser(null);
  };
  const handleSignIn = () => {
    navigate("/login");
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <img
        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F5879a6a745eb8779fccdcbc5507bd45e.cdn.bubble.io%2Ff1650825315134x756049384518255000%2Ffactorem%2520white%2520logo%2520%25282%2529.png?w=192&h=59&auto=compress&fit=crop&dpr=1"
        alt="factorem-logo"
        className="factorem-logo"
      />
      {/* Navbar */}
      <div className="user-dropdown">
        <button className="user-nav-button" onClick={toggleDropdown}>
          {user && (
            <img
              src={user.user_image}
              alt="User Profile"
              className="profile-picture"
            />
            // <></>
          )}
          {!user ? (
            <>
              <span className="sign-in-text" onClick={handleSignIn}>
                Sign In
              </span>
            </>
          ) : (
            // <MenuIcon
            //   sx={{ color: "white" }}
            //   style={{
            //     width: "20px",
            //     height: "20px",
            //     marginRight: "5px",
            //   }}
            // />
            <></>
          )}
        </button>
        <div className="navbar-container">
          {isDropdownOpen && user && (
            <div className="dropdown-box">
              <h6 style={{ textAlign: "center" }}>Hello, {user.user_name}</h6>
              {pathname !== "/mainpage" && (
                <Link
                  className="user-nav-home"
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/"
                >
                  <div>Home</div>
                </Link>
              )}
              {pathname !== `/users/${user._id}` &&
                pathname !== `/users/${user._id}/settings` && (
                  <Link
                    className="user-nav-myprofile"
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/users/profile`}
                    // to={`/users/${user.user_id}`}
                  >
                    <div>My Profile</div>
                  </Link>
                )}
              {/* {pathname !== `/users/${user._id}/friends` && (
                <Link
                  className="user-nav-myfriends"
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/users/${user._id}/friends`}
                >
                  <div>My Following</div>
                </Link>
              )} */}
              {pathname !== `/users/${user._id}` &&
                pathname !== `/users/${user._id}/settings` && (
                  <Link
                    className="user-nav-settings"
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/users/setting`}
                  >
                    <div>Settings</div>
                  </Link>
                )}
              <Link
                className="user-nav-logout"
                style={{ textDecoration: "none", color: "inherit" }}
                to="/"
              >
                <div onClick={handleLogOut}>Log Out</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
