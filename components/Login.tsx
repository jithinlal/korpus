import {
  AspectRatio,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  GridItem,
  Image,
  Input,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../utils/supabaseClient";
import ErrorToast from "./ErrorToast";

type LoginForm = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const color = useColorModeValue("brand.black", "brand.white");
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }) => {
    try {
      const { error, user } = await supabase.auth.signIn({
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
        console.log({ user });
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
    <Container maxW={"container.xl"} p={0}>
      <Flex h={"100vh"} py={[0, 10, 20]} px={[0, 10, 20]}>
        <VStack
          w={"full"}
          h={"full"}
          p={10}
          spacing={10}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={["none", "2xl"]}
          borderColor={color}
          borderWidth={1}
        >
          <AspectRatio r={1} w={40} onClick={toggleColorMode}>
            <Image
              src={
                colorMode === "light"
                  ? "assets/logo_black.png"
                  : "assets/logo_white.png"
              }
              alt={"Logo"}
            />
          </AspectRatio>
          <SimpleGrid
            columns={1}
            rowGap={4}
            w={["100%", "75%", "50%"]}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <GridItem py={2}>
                <FormControl isInvalid={errors.email as any}>
                  <Input
                    id="email"
                    autoComplete={"off"}
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <FormErrorMessage color={"brand.error"}>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem py={2}>
                <FormControl isInvalid={errors.password as any}>
                  <Input
                    id="password"
                    type={"password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <FormErrorMessage color={"brand.error"}>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <Center>
                <Button isLoading={isSubmitting} type="submit">
                  Login
                </Button>
              </Center>
            </form>
          </SimpleGrid>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Login;
