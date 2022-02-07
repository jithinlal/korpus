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
    color: "#BB6464",
    label: "Bills & Utilities",
    id: "Bills & Utilities",
    icon: <FaReceipt />,
  },
  {
    value: 2,
    color: "#7882A4",
    label: "Entertainment",
    id: "Entertainment",
    icon: <FaFilm />,
  },
  {
    value: 3,
    color: "#1572A1",
    icon: <MdFastfood />,
    label: "Food & Drinks",
    id: "Food & Drinks",
  },
  {
    value: 4,
    color: "#655D8A",
    icon: <FaHome />,
    label: "Home",
    id: "Home",
  },
  {
    value: 5,
    color: "#F3C5C5",
    icon: <FaCoins />,
    label: "Investments",
    id: "Investments",
  },
  {
    value: 6,
    color: "#FFBD35",
    icon: <AiOutlineSafety />,
    label: "Insurance",
    id: "Insurance",
  },
  {
    value: 7,
    color: "#3FA796",
    icon: <FaRegHospital />,
    label: "Health",
    id: "Health",
  },
  {
    value: 8,
    color: "#781D42",
    icon: <FaShoppingCart />,
    label: "Shopping",
    id: "Shopping",
  },
  {
    value: 9,
    color: "#89B5AF",
    icon: <FaRegMoneyBillAlt />,
    label: "Salary",
    id: "Salary",
  },
  {
    value: 10,
    color: "#FB7AFC",
    icon: <RiCustomerService2Line />,
    label: "Services & Sale",
    id: "Services & Sale",
  },
  {
    value: 11,
    color: "#2F5D62",
    icon: <FaDice />,
    label: "Others",
    id: "Others",
  },
];
