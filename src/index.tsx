import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.scss";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as Element | DocumentFragment
);
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
