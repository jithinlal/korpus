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
  Link,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from "../types";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Minimum password length is 6")
      .required("Password is required"),
  })
  .required();

const Auth = ({
  authType,
  redirectUrl,
  redirectText,
  onSubmit,
}: {
  authType: string;
  redirectUrl: string;
  redirectText: string;
  onSubmit: SubmitHandler<Form>;
}) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const color = useColorModeValue("brand.black", "brand.white");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

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
              <Center py={5}>
                <VStack>
                  <Button isLoading={isSubmitting} type="submit">
                    {authType}
                  </Button>
                  <NextLink href={redirectUrl} passHref>
                    <Link>{redirectText}</Link>
                  </NextLink>
                </VStack>
              </Center>
            </form>
          </SimpleGrid>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Auth;
