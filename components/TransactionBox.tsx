import { FC } from "react";
import { Box } from "@chakra-ui/react";

interface RestProps {
  alterColor: string;

  [x: string]: any;
}

const TransactionBox: FC<RestProps> = ({ alterColor, children, ...rest }) => (
  <Box
    borderWidth={2}
    borderColor={alterColor}
    borderRadius={"2xl"}
    p={4}
    w={40}
    justify={"space-between"}
    {...rest}
  >
    {children}
  </Box>
);

export default TransactionBox;
