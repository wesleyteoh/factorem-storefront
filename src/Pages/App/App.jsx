import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import SignUpPage from "../SignUpPage/SignUpPage";

export default function App() {
  const [user, setUser] = useState("");
  return (
    <main className="App">
      {user === "buyer" ? (
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
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUpPage />} />
          </Routes>
        </>
      )}
    </main>
  );
}