import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { api } from "../services/api";
import { IPurchaseHistory } from "../interfaces/purchaseHistory";
import { IItem } from "../interfaces/item";
import moment from "moment";

interface IPurchaseHistoryContext {
  purchaseHistories: IPurchaseHistory[];
  today: IPurchaseHistory[];
  thisWeek: IPurchaseHistory[];
  thisMonth: IPurchaseHistory[];
  older: IPurchaseHistory[];
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
      setPurchaseHistories((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro addPurchase", error);
    }
  };

  const categorizedPurchases = useMemo(() => {
    const today: IPurchaseHistory[] = [];
    const thisWeek: IPurchaseHistory[] = [];
    const thisMonth: IPurchaseHistory[] = [];
    const older: IPurchaseHistory[] = [];

    purchaseHistories.forEach((purchase) => {
      const purchaseDate = moment(purchase.purchaseDate);
      const now = moment();

      if (purchaseDate.isSame(now, "day")) {
        today.push(purchase);
      } else if (purchaseDate.isSame(now, "week")) {
        thisWeek.push(purchase);
      } else if (purchaseDate.isSame(now, "month")) {
        thisMonth.push(purchase);
      } else {
        older.push(purchase);
      }
    });

    return { today, thisWeek, thisMonth, older };
  }, [purchaseHistories]);

  useEffect(() => {
    fetchPurchaseHistory();
  }, [fetchPurchaseHistory]);

  return (
    <PurchaseHistoryContext.Provider
      value={{
        purchaseHistories,
        today: categorizedPurchases.today,
        thisWeek: categorizedPurchases.thisWeek,
        thisMonth: categorizedPurchases.thisMonth,
        older: categorizedPurchases.older,
        setPurchaseHistories,
        addPurchase,
      }}
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
