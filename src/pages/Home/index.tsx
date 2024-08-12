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
      <Header isCheckout={false} />
      <main className={styles.container}>
        <PageTitle title="Lista de produtos" />
        <section className={styles.row}>
          {products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </section>
      </main>
      <Modal />
    </>
  );
}

export default Home;
