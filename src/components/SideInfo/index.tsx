import React from "react";
import styles from "./sideInfo.module.scss";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { useCart } from "../../context/CartContext";
import Item from "../Item";

const SideInfo: React.FC<{ isOpen: boolean; closePanel: () => void }> = ({
  isOpen,
  closePanel,
}) => {
  const { items, totalPoints } = useCart();
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/checkout");
  }

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.showOverlay : ""}`}
      onClick={closePanel}
    >
      <div
        className={`${styles.cartSidebar} ${isOpen ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.row}>
          <p>MINHA SACOLA</p>
          <button className={styles.closeButton} onClick={closePanel}>
            X
          </button>
        </div>
        <div className={styles.rowItens}>
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>

        <div className={styles.cartSummary}>
          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{totalPoints}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Descontos</span>
              <span>0</span>
            </div>
            <div className={styles.summaryRow}>
              <strong>Total</strong>
              <strong>{totalPoints}</strong>
            </div>
          </div>
          <div className={styles.actions}>
            <Button
              text="FINALIZAR COMPRA"
              type="button"
              handleNavigate={handleNavigate}
              isDisabled={items.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideInfo;
