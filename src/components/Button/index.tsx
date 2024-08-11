import React from "react";
import styles from "./btn.module.scss";

interface IButton {
  text: string;
  handleNavigate?: () => void;
  onClick?: () => void;
}

const Button: React.FC<IButton> = ({ text, handleNavigate, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (handleNavigate) {
      handleNavigate();
    } else {
      return;
    }
  };
  return (
    <button onClick={handleClick} className={styles.checkoutButton}>
      {text}
    </button>
  );
};

export default Button;
