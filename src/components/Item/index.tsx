import React from "react";
import styles from "./item.module.scss";
import { FaMinusCircle, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";

interface IItem {
  id: number;
  src: string;
  name: string;
  price: number;
  qnt: number;
}

const Item: React.FC<IItem> = (item) => {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.itemImg} src={item.src} alt={item.name} />
        <div className={styles.row}>
          <p>{item.name}</p>
          <div className={styles.qtdRow}>
            <p>
              Qtd: <span>{item.qnt}</span>
            </p>
            <FaPlusCircle className={styles.icon} />
            <FaMinusCircle className={styles.icon} />
          </div>
          <p>Preço: {item.price}</p>
        </div>
        <div className={styles.iconRow}>
          <FaRegTrashAlt className={styles.icon} />
        </div>
      </div>
      <hr />
    </>
  );
};

export default Item;
