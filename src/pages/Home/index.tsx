import React from "react";
import Header from "../../components/Header";
import styles from "./home.module.scss";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";

import juice from "../../assets/juice.png";
import food from "../../assets/food.png";
import voucher from "../../assets/voucher.png";

const items = [
  {
    id: 1,
    src: juice,
    name: "Suco de laranja",
    price: 5,
    qnt: 1,
  },
  {
    id: 2,
    src: food,
    name: "Almoço especial",
    price: 20,
    qnt: 3,
  },
  {
    id: 3,
    src: voucher,
    name: "10% de desconto",
    price: 10,
    qnt: 1,
  },
];

function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <PageTitle title="Lista de produtos" />
        <div className={styles.row}>
          {items.map((item) => (
            <Card {...item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
