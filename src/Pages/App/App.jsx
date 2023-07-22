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
import CartPage from "../CartPage/CartPage";
import Unauthorised from "../../Components/Unauthorised";
import HistoryPage from "../HistoryPage/HistoryPage";
import ConfirmationPage from "../CartPage/ConfirmationPage";
import ProductPage from "../ProductPage/ProductPage";
import SearchPage from "../SearchPage/SearchPage";

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
          <Route path="/users/profile" element={<AccountPage user={user} />} />
          <Route path="/users/setting" element={<SettingsPage user={user} />} />
          <Route path="/users/history" element={<HistoryPage />} />
          <Route path="/cart" element={<CartPage user={user} />} />
          <Route path="/checkout" element={<ConfirmationPage user={user} />} />
          <Route path="/products/search/:searchTerm" element={<SearchPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/unauthorised" element={<Unauthorised />} />
        </Routes>
      </>
      {/* )} */}
    </main>
  );
}
