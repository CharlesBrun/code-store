import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PurchaseHistory from "./pages/PurchaseHistory";
import Checkout from "./pages/Checkout";

import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { WalletProvider } from "./context/WalletContext";
import { PurchaseHistoryProvider } from "./context/PurchaseHistoryContext";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <WalletProvider>
          <CartProvider>
            <CheckoutProvider>
              <PurchaseHistoryProvider>
                <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route path={"/historico"} element={<PurchaseHistory />} />
                  <Route path={"/checkout"} element={<Checkout />} />
                </Routes>
              </PurchaseHistoryProvider>
            </CheckoutProvider>
          </CartProvider>
        </WalletProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
