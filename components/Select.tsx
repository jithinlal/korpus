import { useState } from "react";
import { Select, useColorModeValue } from "@chakra-ui/react";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

const SelectComponent = () => {
  const mainColor = useColorModeValue("brand.white", "brand.black");
  const alterColor = useColorModeValue("brand.black", "brand.white");

  return (
    <Select placeholder="Select option">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option2">Option 2</option>
      <option value="option2">Option 2</option>
      <option value="option2">Option 2</option>
      <option value="option2">Option 2</option>
      <option value="option2">Option 2</option>
      <option value="option2">Option 2</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
};

export default SelectComponent;
