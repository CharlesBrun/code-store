import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { api } from "../services/api";

interface IWalletContext {
  wallet: number;
  setWallet: React.Dispatch<React.SetStateAction<number>>;
  updateWallet: (updatedValue: number) => Promise<void>;
}

const WalletContext = createContext<IWalletContext | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wallet, setWallet] = useState(0);

  const fetchWallet = useCallback(async () => {
    try {
      const response = await api.get("/wallet");
      const { points } = response.data;
      setWallet(points);
    } catch (error) {
      console.error("Erro ao buscar a carteira", error);
    }
  }, []);

  const updateWallet = async (updatedValue: number) => {
    try {
      const response = await api.put("/wallet", { points: updatedValue });
      const { points } = response.data;

      setWallet(points);
    } catch (error) {
      console.error("Erro updateWallet", error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return (
    <WalletContext.Provider value={{ wallet, setWallet, updateWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): IWalletContext => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("erro");
  }
  return context;
};
