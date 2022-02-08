import {
  FaReceipt,
  FaFilm,
  FaHome,
  FaCoins,
  FaRegHospital,
  FaShoppingCart,
  FaRegMoneyBillAlt,
  FaDice,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
import { RiCustomerService2Line } from "react-icons/ri";

export const Category = [
  {
    value: 1,
    icon: FaReceipt,
    label: "Bills & Utilities",
    id: "Bills & Utilities",
    lColor: "#03506F",
    dColor: "#FFAFAF",
  },
  {
    value: 2,
    icon: FaFilm,
    label: "Entertainment",
    id: "Entertainment",
    lColor: "#E63E6D",
    dColor: "#91C788",
  },
  {
    value: 3,
    icon: MdFastfood,
    label: "Food & Drinks",
    id: "Food & Drinks",
    lColor: "#7A0BC0",
    dColor: "#FFAB76",
  },
  {
    value: 4,
    icon: FaHome,
    label: "Home",
    id: "Home",
    lColor: "#FA58B6",
    dColor: "#E7FBBE",
  },
  {
    value: 5,
    icon: FaCoins,
    label: "Investments",
    id: "Investments",
    lColor: "#2D4263",
    dColor: "#F999B7",
  },
  {
    value: 6,
    icon: AiOutlineSafety,
    label: "Insurance",
    id: "Insurance",
    lColor: "#C84B31",
    dColor: "#84DFFF",
  },
  {
    value: 7,
    icon: FaRegHospital,
    label: "Health",
    id: "Health",
    lColor: "#064663",
    dColor: "#C3B091",
  },
  {
    value: 8,
    icon: FaShoppingCart,
    label: "Shopping",
    id: "Shopping",
    lColor: "#864879",
    dColor: "#C8E3D4",
  },
  {
    value: 9,
    icon: FaRegMoneyBillAlt,
    label: "Salary",
    id: "Salary",
    lColor: "#1E5128",
    dColor: "#B5DEFF",
  },
  {
    value: 10,
    icon: RiCustomerService2Line,
    label: "Services & Sale",
    id: "Services & Sale",
    lColor: "#950101",
    dColor: "#C9CCD5",
  },
  {
    value: 11,
    icon: FaDice,
    label: "Others",
    id: "Others",
    lColor: "#3D2C8D",
    dColor: "#28FFBF",
  },
];

export const findCategory = (id: number) => {
  return Category.find((item) => item.value === id);
};
