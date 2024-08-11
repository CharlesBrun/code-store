import React, { useState } from "react";
import styles from "./sideInfo.module.scss";

interface ISideInfo {
  children: React.ReactNode;
  isOpen: boolean;
  closePanel: () => void;
}

const SideInfo: React.FC<ISideInfo> = ({ children, isOpen, closePanel }) => {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.showOverlay : ""}`}
      onClick={closePanel}
    >
      <div
        className={`${styles.cartSidebar} ${isOpen ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <button className={styles.closeButton} onClick={closePanel}>
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SideInfo;
