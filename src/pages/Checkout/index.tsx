import React from "react";
import styles from "./checkout.module.scss";

import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";

import { useCheckout } from "../../context/CheckoutContext";
import { useCart } from "../../context/CartContext";
import Button from "../../components/Button";
import DangerAlert from "../../components/Alert";

function Checkout() {
  const { items, totalPoints } = useCart();
  const {
    states,
    isLoading,
    register,
    handleSubmit,
    errors,
    onSubmit,
    alertShow,
    handleAlert,
  } = useCheckout();

  return (
    <>
      <Header isCheckout={true} />
      {alertShow ? (
        <DangerAlert text="Saldo Insuficiente" closeAlert={handleAlert} />
      ) : null}

      <div className={styles.container}>
        <PageTitle title="Checkout" redirect={"/"} />
        <section className={styles.row}>
          {/* Formulario de pagamento */}
          <form
            className={styles.checkoutForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome Completo</label>
              <input
                id="name"
                placeholder="Nome completo"
                {...register("name", { required: "Nome é obrigatório" })}
              />
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="email@email.com"
                {...register("email", { required: "Email é obrigatório" })}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={styles.rowForm}>
              <div className={`${styles.formGroup} ${styles.addressGroup}`}>
                <label htmlFor="street">Rua</label>
                <input
                  id="street"
                  placeholder="Rua"
                  {...register("street", { required: "Rua é obrigatória" })}
                />
                {errors.street && (
                  <p className={styles.error}>{errors.street.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="neighborhood">Bairro</label>
                <input
                  id="neighborhood"
                  placeholder="Bairro"
                  {...register("neighborhood", {
                    required: "Bairro é obrigatório",
                  })}
                />
                {errors.neighborhood && (
                  <p className={styles.error}>{errors.neighborhood.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="number">Número</label>
                <input
                  id="number"
                  type="number"
                  pattern="\d*"
                  placeholder="Numero"
                  {...register("number", { required: "Número é obrigatório" })}
                />
                {errors.number && (
                  <p className={styles.error}>{errors.number.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="city">Cidade</label>
                <input
                  id="city"
                  placeholder="Cidade"
                  {...register("city", { required: "Cidade é obrigatória" })}
                />
                {errors.city && (
                  <p className={styles.error}>{errors.city.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="state">Estado</label>
                <select
                  id="state"
                  {...register("state", { required: "Estado é obrigatório" })}
                >
                  <option value="">Selecione um estado</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.sigla}>
                      {state.nome}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className={styles.error}>{errors.state.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="zip">CEP</label>
                <input
                  id="zip"
                  type="number"
                  placeholder="00000000"
                  {...register("zip", { required: "CEP é obrigatório" })}
                />
                {errors.zip && (
                  <p className={styles.error}>{errors.zip.message}</p>
                )}
              </div>
            </div>

            <div className={styles.containerBtn}>
              <div className={styles.row}>
                <Button
                  text="Finalizar Compra"
                  type="submit"
                  isLoading={isLoading}
                />
              </div>
            </div>
          </form>
          {/* Dados da compra */}
          <div className={styles.orderSummary}>
            <h3>Resumo do Pedido</h3>
            {items.map((item) => (
              <div key={item.id} className={styles.product}>
                <span>{item.name}: </span>
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
