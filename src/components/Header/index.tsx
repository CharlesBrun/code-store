import React, { useState } from "react";
import styles from "./header.module.scss";
import {
  MdOutlineQueryBuilder,
  MdOutlineShoppingCart,
  MdAccountBalanceWallet,
} from "react-icons/md";
import SideInfo from "../SideInfo";

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { walletPoints, totalItems } = useCart();
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen((prevOpen) => !prevOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <header className={styles.container}>
        <div className={styles.row}>
          <MdAccountBalanceWallet className={styles.iconWallet} />
          <p>
            Pontos: <span>{walletPoints}</span>
          </p>
        </div>
        <div className={styles.rowNavIcon}>
          <div className={styles.cartIconContainer}>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
            <MdOutlineShoppingCart
              className={styles.navIcon}
              onClick={toggleCart}
            />
          </div>
          <MdOutlineQueryBuilder
            className={styles.navIcon}
            onClick={() => navigate("/historico")}
          />
        </div>
      </header>
      <SideInfo isOpen={isCartOpen} closePanel={closeCart} />
    </>
  );
};

export default Header;
