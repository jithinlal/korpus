import { IconType } from "react-icons";

export type Form = {
  email: string;
  password: string;
};

export type RestProps = {
  alterColor: string;
  [x: string]: any;
};

export type AddTransactionProps = {
  alterColor: string;
  mainColor: string;
  [x: string]: any;
};

export type TransactionItemProps = {
  category: IconType;
  amount: number;
  description: string;
  date: string;
  color?: string;
  [x: string]: any;
};

export type TransactionStore = {
  id: number;
  category: number;
  amount: number;
  date: string;
  note: string;
};
