import React from "react";
import styles from "./sideInfo.module.scss";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

interface ISideInfo {
  children: React.ReactNode;
  isOpen: boolean;
  closePanel: () => void;
}

const SideInfo: React.FC<ISideInfo> = ({ children, isOpen, closePanel }) => {
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
        <div className={styles.rowItens}>{children}</div>

        <div className={styles.cartSummary}>
          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>R$ 599,97</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Descontos</span>
              <span>R$ 0,00</span>
            </div>
            <div className={styles.summaryRow}>
              <strong>Total</strong>
              <strong>R$ 419,97</strong>
            </div>
          </div>
          <div className={styles.actions}>
            <Button text="FINALIZAR COMPRA" handleNavigate={handleNavigate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideInfo;
