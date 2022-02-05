import { Box, Center } from "@chakra-ui/react";

const ErrorToast = ({ message }: { message: string }) => {
  return (
    <Box color={"brand.white"} p={2} borderRadius={"md"} bg={"brand.error"}>
      <Center>{message}</Center>
    </Box>
  );
};

export default ErrorToast;
