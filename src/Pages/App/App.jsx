import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";

export default function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </main>
  );
}
