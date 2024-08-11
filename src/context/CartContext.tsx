import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";
import { IItem } from "../types/item";

interface CartContextType {
  item: IItem;
  products: IItem[];
  items: IItem[];
  totalPoints: number;
  totalItems: number;
  addToCart: (item: IItem) => void;
  removeFromCart: (item: IItem) => void;
  removeAll: (item: IItem) => void;
  walletPoints: number;

  openModal: (item: IItem) => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const walletPoints = 1000;
  const [item, setItem] = useState<IItem>({} as IItem);
  const [products, setProducts] = useState<IItem[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (Selecteditem: IItem) => {
    setItem(Selecteditem);
    setModalOpen(true);
  };
  const closeModal = () => {
    setItem({} as IItem);
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const newTotalItems = items.reduce((total, item) => total + item.qnt, 0);
    setTotalItems(newTotalItems);
  }, [items]);

  const addToCart = (item: IItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      let updatedItems;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          qnt: existingItem.qnt + 1,
        };
        updatedItems = prevItems.map((i) =>
          i.id === item.id ? updatedItem : i
        );
      } else {
        updatedItems = [...prevItems, { ...item, qnt: 1 }];
      }

      const newTotalPoints = updatedItems.reduce(
        (total, i) => total + i.price * i.qnt,
        0
      );
      setTotalPoints(newTotalPoints);
      return updatedItems;
    });
  };

  const removeFromCart = (item: IItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      let updatedItems;
      if (existingItem) {
        if (existingItem.qnt > 1) {
          const updatedItem = {
            ...existingItem,
            qnt: existingItem.qnt - 1,
          };
          updatedItems = prevItems.map((i) =>
            i.id === item.id ? updatedItem : i
          );
        } else {
          updatedItems = prevItems.filter((i) => i.id !== item.id);
        }
      } else {
        updatedItems = [...prevItems];
      }

      const newTotalPoints = updatedItems.reduce(
        (total, i) => total + i.price * i.qnt,
        0
      );
      setTotalPoints(newTotalPoints);
      return updatedItems;
    });
  };

  const removeAll = (item: IItem) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((i) => i.id !== item.id);

      const newTotalPoints = updatedItems.reduce(
        (total, i) => total + i.price * i.qnt,
        0
      );
      setTotalPoints(newTotalPoints);
      return updatedItems;
    });
  };

  return (
    <CartContext.Provider
      value={{
        item,
        products,
        items,
        totalPoints,
        totalItems,
        addToCart,
        removeFromCart,
        removeAll,
        walletPoints,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("erro");
  }
  return context;
};
