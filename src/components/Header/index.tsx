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
import { useWallet } from "../../context/WalletContext";

const Header: React.FC<{ isCheckout: boolean }> = ({ isCheckout }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();
  const { wallet } = useWallet();
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
            Pontos: <span>{wallet}</span>
          </p>
        </div>
        <div className={styles.rowNavIcon}>
          {!isCheckout ? (
            <div className={styles.cartIconContainer}>
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
              <MdOutlineShoppingCart
                className={styles.navIcon}
                onClick={toggleCart}
              />
            </div>
          ) : null}
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
