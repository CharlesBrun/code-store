import React from "react";
import styles from "./btn.module.scss";

interface IButton {
  text: string;
  handleNavigate?: () => void;
  onClick?: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<IButton> = ({
  text,
  handleNavigate,
  onClick,
  isDisabled,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (handleNavigate) {
      handleNavigate();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`${styles.checkoutButton} ${
        isDisabled ? styles.disabled : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
