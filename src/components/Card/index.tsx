import React from "react";
import styles from "./card.module.scss";
import Button from "../Button";
import { useCart } from "../../context/CartContext";
import { IItem } from "../../types/item";

const Card: React.FC<IItem> = (product) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <div className={styles.container}>
      <img src={product.src} alt={product.name} />
      <div className={styles.row}>
        <div className={styles.descriptionRow}>
          <p className={styles.cardTitle}>{product.name}</p>
          <p className={styles.cardText}>
            Pontos: <span> {product.price} </span>
          </p>
        </div>
        <div className={styles.cardFooter}>
          <Button
            text="Adicionar ao Carrinho"
            type="button"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
