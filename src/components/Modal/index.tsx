import React from "react";
import styles from "./modal.module.scss";
import { useCart } from "../../context/CartContext";

const Modal = () => {
  const { item, isModalOpen, closeModal, removeAll } = useCart();
  const handleRemoveAll = () => {
    removeAll(item);
    closeModal();
  };
  return (
    <div className={`${styles.modal} ${isModalOpen ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <div className={styles.Modalcontainer}>
          <h1>Remover item</h1>
          <p>Você tem certeza que gostaria de remover o item do carrinho?</p>
          <div className={styles.Modalclearfix}>
            <button
              type="button"
              onClick={closeModal}
              className={`${styles.Modalbtn} ${styles.modalCancelbtn}`}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleRemoveAll}
              className={`${styles.Modalbtn} ${styles.Modaldeletebtn}`}
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
