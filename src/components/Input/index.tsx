import React from "react";
import styles from "./input.module.scss";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ICheckoutFormData } from "../../interfaces/checkout";

interface InputProps {
  id:
    | "name"
    | "email"
    | "address"
    | "street"
    | "neighborhood"
    | "number"
    | "city"
    | "zip";
  label: string;
  type?: string;
  placeholder: string;
  register: UseFormRegister<ICheckoutFormData>;
  errors: FieldErrors<ICheckoutFormData>;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  errors,
  required = false,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, {
          required: required ? `${label} é obrigatório` : false,
        })}
      />
      {errors[id] && <p className={styles.error}>{errors[id].message}</p>}
    </div>
  );
};

export default Input;
