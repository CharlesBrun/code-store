import React from "react";
import styles from "./alert.module.scss";

const DangerAlert: React.FC<{ text: string; closeAlert: () => void }> = ({
  text,
  closeAlert,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.alert}>
        <span className={styles.closebtn} onClick={closeAlert}>
          &times;
        </span>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default DangerAlert;
