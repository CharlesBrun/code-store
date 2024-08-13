import React from "react";
import styles from "./purchaseItem.module.scss";
import { IPurchaseHistory } from "../../interfaces/purchaseHistory";
import moment from "moment";

const PurchaseItem: React.FC<{ purchase: IPurchaseHistory }> = ({
  purchase,
}) => {
  return (
    <div className={styles.container}>
      <h3>Data: {moment(purchase.purchaseDate).format("DD/MM/YYYY HH:mm")}</h3>
      <p>Pontos gastos: {purchase.expensedPoints}</p>
      <ul>
        {purchase.itens.map((item) => (
          <li key={item.id}>
            {item.name} - Quantidade: {item.qnt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseItem;
