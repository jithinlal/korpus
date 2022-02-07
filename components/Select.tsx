import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import Select from "react-select";
import { Category } from "../utils/category";

const SelectComponent = ({ onChange }: { onChange: any }) => {
  const mainColor = useColorModeValue("brand.white", "brand.black");
  const alterColor = useColorModeValue("brand.black", "brand.white");
  const { colorMode } = useColorMode();

  return (
    <Select
      placeholder={"Category"}
      options={Category}
      onChange={onChange}
      // @ts-ignore
      getOptionLabel={(e) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {e.icon}
          <span style={{ marginLeft: 5 }}>{e.label}</span>
        </div>
      )}
      styles={{
        placeholder: (styles) => {
          return { ...styles, color: alterColor };
        },
        control: (styles) => {
          return {
            ...styles,
            boxShadow: "none",
            border: "true",
            backgroundColor: mainColor,
            borderColor: colorMode === "dark" ? "white" : "#2D3748",
            "&:hover": {
              borderColor: mainColor,
            },
            ":active": {
              borderColor: mainColor,
            },
          };
        },
        menu: (styles) => {
          return {
            ...styles,
            backgroundColor: colorMode === "dark" ? "#2D3748" : "white",
          };
        },
        input: (styles) => {
          const alterColor = colorMode === "dark" ? "white" : "black";
          return {
            ...styles,
            color: alterColor,
          };
        },
        dropdownIndicator: (styles) => {
          const alterColor = colorMode === "dark" ? "white" : "black";
          return {
            ...styles,
            color: alterColor,
            "&:hover": {
              color: alterColor,
            },
          };
        },
        singleValue: (styles) => {
          const alterColor = colorMode === "dark" ? "white" : "black";
          return { ...styles, color: alterColor };
        },
        option: (styles, { isFocused, isSelected }) => {
          const mainColor = colorMode === "dark" ? "#2D3748" : "white";
          const mainFocusColor = colorMode === "dark" ? "black" : "white";
          const mainSelectColor = colorMode === "dark" ? "white" : "black";
          const alterColor = colorMode === "dark" ? "white" : "#2D3748";
          const alterFocusColor = colorMode === "dark" ? "white" : "black";
          const alterSelectColor = colorMode === "dark" ? "black" : "white";

          return {
            ...styles,
            backgroundColor: isSelected
              ? mainSelectColor
              : isFocused
              ? alterFocusColor
              : mainColor,
            color: isSelected
              ? alterSelectColor
              : isFocused
              ? mainFocusColor
              : alterColor,
            ":active": {
              backgroundColor: alterColor,
              color: mainColor,
            },
          };
        },
      }}
    />
  );
};

export default SelectComponent;
