import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { TransactionItemProps } from "../types";

const TransactionItem: FC<TransactionItemProps> = ({
  alterColor,
  category,
  description,
  amount,
  date,
  color,
  ...rest
}) => {
  return (
    <Box
      py={2}
      mx={1}
      my={2}
      borderWidth={1}
      borderColor={alterColor}
      borderRadius={"2xl"}
      {...rest}
    >
      <HStack justify={"space-between"} px={1}>
        <Icon as={category} w={10} h={10} color={alterColor} />
        <VStack justify={"center"}>
          <Text color={"brand.error"}>${amount}</Text>
          <Text>{description}</Text>
        </VStack>
        <Text>{date}</Text>
      </HStack>
    </Box>
  );
};

export default TransactionItem;
