import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  Control,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import { api } from "../services/api";
import { useCart } from "./CartContext";
import { IItem } from "../interfaces/item";
import { ICheckoutFormData } from "../interfaces/checkout";
import { useWallet } from "./WalletContext";
import { useLocation, useNavigate } from "react-router-dom";
import { usePurchaseHistory } from "./PurchaseHistoryContext";

interface IState {
  id: number;
  sigla: string;
  nome: string;
}

interface ICheckoutContext {
  items: IItem[];
  states: IState[];
  register: UseFormRegister<ICheckoutFormData>;
  handleSubmit: UseFormHandleSubmit<ICheckoutFormData, undefined>;
  errors: FieldErrors<ICheckoutFormData>;
  isLoading: boolean;
  onSubmit: (data: ICheckoutFormData) => void;

  alertShow: boolean;
  handleAlert: () => void;
}

const CheckoutContext = createContext<ICheckoutContext | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //contexts
  const { items, cleanCart, totalPoints } = useCart();
  const { wallet, updateWallet } = useWallet();
  const { addPurchase } = usePurchaseHistory();
  const navigate = useNavigate();
  const location = useLocation();

  //states
  const [states, setStates] = useState<IState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICheckoutFormData>();

  function handleAlert() {
    setAlertShow(false);
  }

  const handlePage = useCallback(() => {
    const isCheckoutPage = location.pathname === "/checkout";
    if (isCheckoutPage && items.length === 0) navigate("/");
  }, []);

  const onSubmit: SubmitHandler<ICheckoutFormData> = (data) => {
    const checkoutData = {
      ...data,
      items,
    };
    console.log(checkoutData);
    setIsLoading(true);

    setTimeout(async () => {
      if (wallet > totalPoints) {
        await updateWallet(wallet - totalPoints);
        await addPurchase({ itens: items, expensedPoints: totalPoints });
        setIsLoading(false);
        cleanCart();
        navigate("/");
      } else {
        setIsLoading(false);
        setAlertShow(true);
        setTimeout(() => {
          setAlertShow(false);
        }, 5000);
        console.log("Não tem saldo o suficiente");
      }
    }, 2000);
  };

  const fetchStates = useCallback(async () => {
    try {
      const response = await api.get("/states");
      const { data } = response;
      setStates(data);
    } catch (error) {
      console.error("Erro fetchStates", error);
    }
  }, []);

  useEffect(() => {
    handlePage();
    fetchStates();
  }, [fetchStates, handlePage]);

  return (
    <CheckoutContext.Provider
      value={{
        items,
        isLoading,
        states,
        register,
        handleSubmit,
        errors,

        onSubmit,
        alertShow,
        handleAlert,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): ICheckoutContext => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("erro");
  }
  return context;
};
