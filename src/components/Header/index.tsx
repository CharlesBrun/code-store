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

const Header = () => {
  const [openPanel, setOpenPanel] = useState<"cart" | "history" | null>(null);

  const togglePanel = (panel: "cart" | "history") => {
    setOpenPanel((prevPanel) => (prevPanel === panel ? null : panel));
  };

  const closePanel = () => {
    setOpenPanel(null);
  };

  const items = [
    {
      id: 1,
      src: juice,
      name: "suco de laranja",
      price: 10,
      qnt: 1,
    },
    {
      id: 2,
      src: food,
      name: "almoço especial",
      price: 10,
      qnt: 3,
    },
    {
      id: 3,
      src: voucher,
      name: "desconto 10%",
      price: 10,
      qnt: 1,
    },
  ];

  return (
    <>
      <header className={styles.container}>
        <p className={styles.row}>
          <MdAccountBalanceWallet />
          Saldo: 50.00
        </p>
        <div className={styles.rowNavIcon}>
          <MdOutlineShoppingCart
            className={styles.navIcon}
            onClick={() => togglePanel("cart")}
          />
          <MdOutlineQueryBuilder
            className={styles.navIcon}
            onClick={() => togglePanel("history")}
          />
        </div>
      </header>
      <SideInfo
        isOpen={openPanel === "cart"}
        closePanel={closePanel}
        children={items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      />
      <SideInfo
        isOpen={openPanel === "history"}
        closePanel={closePanel}
        children={<p>Histórico de compras</p>}
      />
    </>
  );
};

export default Header;
