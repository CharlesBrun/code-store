import React from "react";
import styles from "./checkout.module.scss";

import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";

import { useCheckout } from "../../context/CheckoutContext";
import { useCart } from "../../context/CartContext";
import Button from "../../components/Button";
import DangerAlert from "../../components/Alert";
import Input from "../../components/Input";

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
            <Input
              id="name"
              label="Nome Completo"
              placeholder="Nome completo"
              register={register}
              errors={errors}
              required={true}
            />

            <Input
              id="email"
              label="E-mail"
              type="email"
              placeholder="email@email.com"
              register={register}
              errors={errors}
              required={true}
            />
            <div className={styles.rowFormAddress}>
              <div className={styles.inputAddress}>
                <Input
                  id="street"
                  label="Rua"
                  placeholder="Rua"
                  register={register}
                  errors={errors}
                  required={true}
                />
              </div>

              <Input
                id="neighborhood"
                label="Bairro"
                placeholder="Bairro"
                register={register}
                errors={errors}
                required={true}
              />
            </div>
            <div className={styles.rowForm}>
              <Input
                id="number"
                label="Número"
                type="number"
                placeholder="Número"
                register={register}
                errors={errors}
                required={true}
              />

              <div className={styles.fillSpace}>
                <Input
                  id="city"
                  label="Cidade"
                  placeholder="Cidade"
                  register={register}
                  errors={errors}
                  required={true}
                />
              </div>

              <div className={styles.fillSpace}>
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
              </div>

              <Input
                id="zip"
                label="CEP"
                type="number"
                placeholder="00000000"
                register={register}
                errors={errors}
                required={true}
              />
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
