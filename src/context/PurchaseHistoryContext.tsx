import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { api } from "../services/api";
import { IPurchaseHistory } from "../interfaces/purchaseHistory";
import { IItem } from "../interfaces/item";
import moment from "moment";

interface IPurchaseHistoryContext {
  purchaseHistories: IPurchaseHistory[];
  setPurchaseHistories: React.Dispatch<
    React.SetStateAction<IPurchaseHistory[]>
  >;
  addPurchase: ({
    itens,
    expensedPoints,
  }: {
    itens: IItem[];
    expensedPoints: number;
  }) => Promise<void>;
}

const PurchaseHistoryContext = createContext<
  IPurchaseHistoryContext | undefined
>(undefined);

export const PurchaseHistoryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [purchaseHistories, setPurchaseHistories] = useState<
    IPurchaseHistory[]
  >([] as IPurchaseHistory[]);

  const fetchPurchaseHistory = useCallback(async () => {
    try {
      const response = await api.get("/purchaseHistories");
      const { data } = response;
      console.log(response);
      setPurchaseHistories(data);
    } catch (error) {
      console.error("Erro fetchStates", error);
    }
  }, []);

  const addPurchase = async ({
    itens,
    expensedPoints,
  }: {
    itens: IItem[];
    expensedPoints: number;
  }) => {
    try {
      const data = {
        itens: itens,
        purchaseDate: moment(),
        expensedPoints: expensedPoints,
      };
      const response = await api.post("/purchaseHistories", data);
      console.log(response);
    } catch (error) {
      console.error("Erro addPurchase", error);
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, [fetchPurchaseHistory]);

  return (
    <PurchaseHistoryContext.Provider
      value={{ purchaseHistories, setPurchaseHistories, addPurchase }}
    >
      {children}
    </PurchaseHistoryContext.Provider>
  );
};

export const usePurchaseHistory = (): IPurchaseHistoryContext => {
  const context = useContext(PurchaseHistoryContext);
  if (context === undefined) {
    throw new Error("erro");
  }
  return context;
};
