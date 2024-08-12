import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./checkout.module.scss";
import { useCart } from "../../context/CartContext";
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";

type CheckoutFormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};

function Checkout() {
  const { items, totalPoints } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    console.log("Form data:", data);
    // Lógica de checkout aqui
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (items.length <= 0) {
      navigate("/");
    }
  }, []);

  {
    /* TODO 
     COLOCAR O CAMPO DE EXPIRAÇÃO NO FORMATO DE DATA 
     CAMPOS DE NUMEROS PERMITIR SOMENTE NUMEROS
     SEPARAR OS CAMPOS DE ENDEREÇO COMO RUA BAIRRO E NUMERO
     NUMERO DE CARTÃO, CVV E DATA DE EXPIRAÇÃO PODE SER MELHOR ORGANIZADO
     OBJETO DO ONSUBMIT PODE TER INCLUSO OS ITENS E O VALOR
     */
  }

  return (
    <>
      <Header isCheckout={true} />
      <div className={styles.container}>
        <PageTitle title="Checkout" redirect={"/"} />
        <section className={styles.row}>
          <form
            className={styles.checkoutForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome Completo</label>
              <input
                id="name"
                {...register("name", { required: "Nome é obrigatório" })}
              />
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email é obrigatório" })}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Endereço</label>
              <input
                id="address"
                {...register("address", { required: "Endereço é obrigatório" })}
              />
              {errors.address && (
                <p className={styles.error}>{errors.address.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                {...register("city", { required: "Cidade é obrigatória" })}
              />
              {errors.city && (
                <p className={styles.error}>{errors.city.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="zip">CEP</label>
              <input
                id="zip"
                {...register("zip", { required: "CEP é obrigatório" })}
              />
              {errors.zip && (
                <p className={styles.error}>{errors.zip.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Número do Cartão</label>
              <input
                id="cardNumber"
                type="text"
                {...register("cardNumber", {
                  required: "Número do cartão é obrigatório",
                })}
              />
              {errors.cardNumber && (
                <p className={styles.error}>{errors.cardNumber.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="expirationDate">Data de Expiração</label>
              <input
                id="expirationDate"
                type="text"
                {...register("expirationDate", {
                  required: "Data de expiração é obrigatória",
                })}
              />
              {errors.expirationDate && (
                <p className={styles.error}>{errors.expirationDate.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="text"
                {...register("cvv", { required: "CVV é obrigatório" })}
              />
              {errors.cvv && (
                <p className={styles.error}>{errors.cvv.message}</p>
              )}
            </div>

            <button type="submit" className={styles.checkoutButton}>
              Finalizar Compra
            </button>
          </form>

          <div className={styles.orderSummary}>
            <h3>Resumo do Pedido</h3>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <span>{item.name}</span>
                <span>
                  {item.qnt} x {item.price} pts
                </span>
              </div>
            ))}
            <div className={styles.total}>
              <strong>Total:</strong>
              <strong>{totalPoints} pts</strong>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Checkout;
