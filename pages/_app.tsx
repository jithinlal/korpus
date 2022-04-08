import { Auth } from "@supabase/ui";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../utils/theme";
import "../styles/fonts.css";
import "../styles/calendar.css";
import { supabase } from "../utils/supabaseClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
