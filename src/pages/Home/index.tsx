import React from "react";
import Header from "../../components/Header";
import styles from "./home.module.scss";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import { useCart } from "../../context/CartContext";

function Home() {
  const { products } = useCart();

  return (
    <>
      <Header />
      <div className={styles.container}>
        <PageTitle title="Lista de produtos" />
        <div className={styles.row}>
          {products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      </div>
      <Modal />
    </>
  );
}

export default Home;
