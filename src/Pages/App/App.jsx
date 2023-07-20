import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LoginPage";
import { getUser } from "../../utilities/users-service";
import AccountPage from "../AccountPage/AccountPage";
import SettingsPage from "../SettingsPage/SettingsPage";

export default function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedInUser = getUser();
    setUser(loggedInUser);
  }, []);
  return (
    <main className="App">
      {/* {user === "buyer" ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </>
      ) : user === "admin" ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </>
      ) : ( */}
      <>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/register" element={<SignUpPage setUser={setUser} />} />
          <Route path="/login" element={<LogInPage setUser={setUser} />} />
          {/* <Route path="/users/:userId" element={<AccountPage user={user} />} /> */}
          <Route path="/users/profile" element={<AccountPage user={user} />} />
          <Route path="/users/setting" element={<SettingsPage user={user} />} />
        </Routes>
      </>
      {/* )} */}
    </main>
  );
}
