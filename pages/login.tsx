import type { NextPage } from "next";
import Auth from "../components/Auth";
import { SubmitHandler } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import ErrorToast from "../components/ErrorToast";
import { useToast } from "@chakra-ui/react";
import { Form } from "../types/Form";

const Login: NextPage = () => {
  const toast = useToast();
  const onSubmit: SubmitHandler<Form> = async ({ email, password }) => {
    try {
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        toast({
          title: error.message,
          position: "top-right",
          isClosable: true,
          status: "error",
          duration: 3000,
          variant: "solid",
          render: () => <ErrorToast message={error.message} />,
        });
      }
    } catch (error: any) {
      toast({
        title: error.error_description || error.message,
        position: "top-right",
        isClosable: true,
        status: "error",
        variant: "solid",
      });
    }
  };

  return (
    <div>
      <Auth
        authType={"Login"}
        redirectUrl={"/register"}
        redirectText={"I am new here!"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
