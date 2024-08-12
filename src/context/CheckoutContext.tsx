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
import { useNavigate } from "react-router-dom";
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
  control: Control<ICheckoutFormData, any>;
  handleSubmit: UseFormHandleSubmit<ICheckoutFormData, undefined>;
  errors: FieldErrors<ICheckoutFormData>;
  isLoading: boolean;
  onSubmit: (data: ICheckoutFormData) => void;
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
  //states
  const [states, setStates] = useState<IState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICheckoutFormData>();

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
    fetchStates();
  }, [fetchStates]);

  return (
    <CheckoutContext.Provider
      value={{
        items,
        isLoading,
        states,
        register,
        control,
        handleSubmit,
        errors,

        onSubmit,
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
