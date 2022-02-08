import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { TransactionItemProps } from "../types";

const TransactionItem: FC<TransactionItemProps> = ({
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
      borderColor={color}
      borderRadius={"2xl"}
      {...rest}
    >
      <HStack justify={"space-between"} px={{ base: 2, md: 4 }}>
        <Icon as={category} w={10} h={10} color={color} />
        <VStack justify={"center"}>
          <Text color={color}>${amount}</Text>
          <Text color={color}>{description}</Text>
        </VStack>
        <Text color={color}>{date}</Text>
      </HStack>
    </Box>
  );
};

export default TransactionItem;
