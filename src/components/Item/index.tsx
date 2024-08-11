import React from "react";
import styles from "./item.module.scss";
import { FaMinusCircle, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { IItem } from "../../types/item";

const Item: React.FC<IItem> = (item) => {
  const { addToCart, removeFromCart, openModal } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item);
  };

  const handleRemoveAll = () => {
    openModal(item);
  };

  return (
    <>
      <div className={styles.container}>
        <img className={styles.itemImg} src={item.src} alt={item.name} />
        <div className={styles.row}>
          <p className={styles.itemName}>{item.name}</p>
          <div className={styles.qtdRow}>
            <p className={styles.subTopic}>
              Qtd: <span>{item.qnt}</span>
            </p>
            <FaPlusCircle className={styles.icon} onClick={handleAddToCart} />
            <FaMinusCircle
              className={styles.icon}
              onClick={handleRemoveFromCart}
            />
          </div>
          <p className={styles.subTopic}>
            Pontos: <span>{item.price}</span>
          </p>
        </div>
        <div className={styles.iconRow}>
          <FaRegTrashAlt className={styles.icon} onClick={handleRemoveAll} />
        </div>
      </div>
      <hr className={styles.itemDivider} />
    </>
  );
};

export default Item;
