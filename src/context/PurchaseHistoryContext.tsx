import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

interface IPurchaseHistoryContext {
  purchaseHistories: any;
  setPurchaseHistories: React.Dispatch<React.SetStateAction<any>>;
}

const PurchaseHistoryContext = createContext<any | undefined>(undefined);

export const PurchaseHistoryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [purchaseHistories, setPurchaseHistories] = useState<any>();
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await api.get("/purchaseHistories");
        const { data } = response;
        console.log(response);
        setPurchaseHistories(data);
      } catch (error) {
        console.error("Erro fetchStates", error);
      }
    };

    fetchPurchaseHistory();
  }, []);

  return (
    <PurchaseHistoryContext.Provider
      value={{ purchaseHistories, setPurchaseHistories }}
    >
      {children}
    </PurchaseHistoryContext.Provider>
  );
};

export const useWallet = (): IPurchaseHistoryContext => {
  const context = useContext(PurchaseHistoryContext);
  if (context === undefined) {
    throw new Error("erro");
  }
  return context;
};
