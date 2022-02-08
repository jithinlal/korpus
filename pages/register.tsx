import { NextPage } from "next";
import Auth from "../components/Auth";
import { useToast } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "../types";
import { supabase } from "../utils/supabaseClient";
import ErrorToast from "../components/ErrorToast";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const onSubmit: SubmitHandler<Form> = async ({ email, password }) => {
    try {
      const { error } = await supabase.auth.signUp({
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
      } else {
        await router.replace("/");
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
    <Auth
      authType={"Register"}
      redirectText={"I have an account!"}
      redirectUrl={"/"}
      onSubmit={onSubmit}
    />
  );
};

export default Register;
