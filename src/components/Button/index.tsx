import React from "react";
import styles from "./btn.module.scss";

interface IButton {
  text: string;
  handleNavigate?: () => void;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  type: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<IButton> = ({
  text,
  type,
  handleNavigate,
  onClick,
  isDisabled,
  isLoading,
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
      type={type}
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      className={`${styles.checkoutButton} ${
        isDisabled || isLoading ? styles.disabled : ""
      }`}
    >
      {isLoading ? (
        <i className={`${styles.loadingIcon} fa fa-spinner fa-spin`}></i>
      ) : null}
      {text}
    </button>
  );
};

export default Button;
