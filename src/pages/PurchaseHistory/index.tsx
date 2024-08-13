import React from "react";
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";
import styles from "./purchase.module.scss";
import { usePurchaseHistory } from "../../context/PurchaseHistoryContext";
import PurchaseItem from "../../components/PurchaseItem";

function PurchaseHistory() {
  const { today, thisWeek, thisMonth, older } = usePurchaseHistory();

  return (
    <>
      <Header isCheckout={false} />
      <main className={styles.container}>
        <PageTitle title="Histórico de Compras" redirect={"/"} />

        {today.length > 0 && (
          <section>
            <h2>Hoje</h2>
            <div className={styles.row}>
              {today.map((purchase) => (
                <PurchaseItem key={purchase.id} purchase={purchase} />
              ))}
            </div>
          </section>
        )}

        {thisWeek.length > 0 && (
          <section>
            <h2>Esta Semana</h2>
            <div className={styles.row}>
              {thisWeek.map((purchase) => (
                <PurchaseItem key={purchase.id} purchase={purchase} />
              ))}
            </div>
          </section>
        )}

        {thisMonth.length > 0 && (
          <section>
            <h2>Este Mês</h2>
            <div className={styles.row}>
              {thisMonth.map((purchase) => (
                <PurchaseItem key={purchase.id} purchase={purchase} />
              ))}
            </div>
          </section>
        )}

        {older.length > 0 && (
          <section>
            <h2>Mais Antigas</h2>
            <div className={styles.row}>
              {older.map((purchase) => (
                <PurchaseItem key={purchase.id} purchase={purchase} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default PurchaseHistory;
