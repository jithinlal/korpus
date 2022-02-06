import {
  extendTheme,
  theme as base,
  ThemeConfig,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  shadows: {
    outline: "0 0 0 3px gray",
  },
  colors: {
    brand: {
      white: "#fff",
      "white-dark": "#d3d3d3",
      "200": "#b5b5b5",
      "300": "#979797",
      "400": "#818181",
      grey: "#6b6b6b",
      "600": "#636363",
      "700": "#585858",
      "black-light": "#4e4e4e",
      black: "#1a202c",
      error: "#fa4747",
      success: "#3af848",
    },
  },
  fonts: {
    heading: `Inconsolata, ${base.fonts?.heading}`,
    body: `Inconsolata, ${base.fonts?.body}`,
  },
  components: {
    Input: {
      baseStyle: (props: any) => ({
        field: {
          backgroundColor: mode("brand.white", "brand.black")(props),
          borderColor: mode("brand.black", "brand.white")(props),
          borderWidth: 1,
          color: mode("brand.black", "brand.white")(props),
          ":focus": {
            borderColor: mode("brand.white", "brand.black")(props),
          },
          _placeholder: {
            color: mode("brand.black-light", "brand.white-dark")(props),
          },
        },
      }),
      defaultProps: {
        variant: null,
      },
    },
    Button: {
      baseStyle: (props: any) => ({
        color: mode("brand.black", "brand.white")(props),
        borderColor: mode("brand.black", "brand.white")(props),
        borderWidth: 1,
        _focus: {
          backgroundColor: mode("brand.black", "brand.white")(props),
          color: mode("brand.white", "brand.black")(props),
          boxShadow: "none",
        },
      }),
      defaultProps: {
        variant: null,
      },
    },
  },
};

const theme = extendTheme(config);

export default theme;
