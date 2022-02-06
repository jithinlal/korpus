import { IconType } from "react-icons";

export type Form = {
  email: string;
  password: string;
};

export type RestProps = {
  alterColor: string;
  [x: string]: any;
};

export type TransactionItemProps = {
  alterColor: string;
  categoryIcon: IconType;
  amount: number;
  category: string;
  date: string;
  [x: string]: any;
};
