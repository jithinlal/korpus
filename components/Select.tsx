import {
  Box,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Select from "react-select";
import { Category } from "../utils/category";

const SelectComponent = ({ onChange }: { onChange: any }) => {
  const mainColor = useColorModeValue("brand.white", "brand.black");
  const alterColor = useColorModeValue("brand.black", "brand.white");
  const { colorMode } = useColorMode();

  return (
    <Select
      isSearchable={false}
      placeholder={"Category"}
      options={Category}
      onChange={onChange}
      // @ts-ignore
      getOptionLabel={(e) => (
        <Box display={"flex"} alignItems={"center"}>
          <Icon
            as={e.icon}
            color={colorMode === "dark" ? e.dColor : e.lColor}
          />
          <Text
            style={{ marginLeft: 5 }}
            color={colorMode === "dark" ? e.dColor : e.lColor}
          >
            {e.label}
          </Text>
        </Box>
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
          const mainSelectColor = colorMode === "dark" ? "#212121" : "#e1e1e1";
          const alterColor = colorMode === "dark" ? "white" : "#2D3748";
          const alterFocusColor = colorMode === "dark" ? "#212121" : "#e1e1e1";
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
              backgroundColor: alterFocusColor,
              color: mainColor,
            },
          };
        },
      }}
    />
  );
};

export default SelectComponent;
