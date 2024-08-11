import React from "react";
import styles from "./card.module.scss";
import Button from "../Button";
import { useCart } from "../../context/CartContext";

interface IItem {
  id: number;
  src: string;
  name: string;
  price: number;
  qnt: number;
}

const Card: React.FC<IItem> = (item) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };
  return (
    <div className={styles.container}>
      <img src={item.src} alt={item.name} />
      <div className={styles.row}>
        <div className={styles.descriptionRow}>
          <p className={styles.cardTitle}>{item.name}</p>
          <p className={styles.cardText}>
            Pontos: <span> {item.price} </span>
          </p>
        </div>
        <div className={styles.cardFooter}>
          <Button text="Adicionar ao Carrinho" onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default Card;
