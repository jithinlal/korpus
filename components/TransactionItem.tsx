import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { TransactionItemProps } from "../types";

const TransactionItem: FC<TransactionItemProps> = ({
  alterColor,
  categoryIcon,
  category,
  amount,
  date,
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
        <Icon as={categoryIcon} w={10} h={10} color={alterColor} />
        <VStack justify={"center"}>
          <Text color={"brand.error"}>${amount}</Text>
          <Text>{category}</Text>
        </VStack>
        <Text>{date}</Text>
      </HStack>
    </Box>
  );
};

export default TransactionItem;
