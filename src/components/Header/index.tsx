import React, { useState } from "react";
import styles from "./header.module.scss";
import {
  MdOutlineQueryBuilder,
  MdOutlineShoppingCart,
  MdAccountBalanceWallet,
} from "react-icons/md";
import SideInfo from "../SideInfo";

import Item from "../Item";
import juice from "../../assets/juice.png";
import food from "../../assets/food.png";
import voucher from "../../assets/voucher.png";
import { useNavigate } from "react-router-dom";

const items = [
  {
    id: 1,
    src: juice,
    name: "Suco de laranja",
    price: 10,
    qnt: 1,
  },
  {
    id: 2,
    src: food,
    name: "Almoço especial",
    price: 10,
    qnt: 3,
  },
  {
    id: 3,
    src: voucher,
    name: "Desconto 10%",
    price: 10,
    qnt: 1,
  },
];

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
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
            Pontos: <span>1000</span>
          </p>
        </div>
        <div className={styles.rowNavIcon}>
          <MdOutlineShoppingCart
            className={styles.navIcon}
            onClick={toggleCart}
          />
          <MdOutlineQueryBuilder
            className={styles.navIcon}
            onClick={() => {
              navigate("/historico");
            }}
          />
        </div>
      </header>
      <SideInfo
        isOpen={isCartOpen}
        closePanel={closeCart}
        children={items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      />
    </>
  );
};

export default Header;
