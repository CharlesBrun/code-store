import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/historico"} element={<History />} />
          <Route path={"/checkout"} element={<Checkout />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
