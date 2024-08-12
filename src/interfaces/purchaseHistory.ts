import { IItem } from "./item";

export interface IPurchaseHistory {
  id: number;
  itens: IItem[];
  purchaseDate: Date;
  expensedPoints: number;
}
