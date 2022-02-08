import Header from "./Header";
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MdArrowCircleUp, MdArrowCircleDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import TransactionBox from "./TransactionBox";
import TransactionItem from "./TransactionItem";
import AddTransaction from "./AddTransaction";
import { useTransactionStore } from "../store/transaction";
import { findCategory } from "../utils/category";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();
  const mainColor = useColorModeValue("brand.white", "brand.black");
  const alterColor = useColorModeValue("brand.black", "brand.white");
  const transactions = useTransactionStore().transactions;

  useEffect(() => {
    setLoading(true);
    useTransactionStore
      .getState()
      .fetchTransactions()
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header>
        <Center>
          <Box
            h={{ base: "auto", md: "100vh" }}
            w={{ base: "full", lg: "50%" }}
          >
            <VStack w={"full"} h={"full"} align={"center"}>
              <HStack
                justify={{ base: "center", md: "space-around" }}
                w={"full"}
                pt={10}
                px={5}
              >
                <TransactionBox alterColor={alterColor}>
                  <HStack justify={{ md: "space-around" }}>
                    <Icon
                      as={MdArrowCircleUp}
                      w={10}
                      h={10}
                      color={"brand.error"}
                    />
                    <VStack>
                      <Text
                        fontWeight={"semibold"}
                        color={"brand.error"}
                        fontSize={{
                          base: "14",
                          md: "18",
                        }}
                      >
                        Spending
                      </Text>
                      <Text
                        fontWeight={"bold"}
                        color={"brand.error"}
                        fontSize={{
                          base: "14",
                          md: "18",
                        }}
                      >
                        $100
                      </Text>
                    </VStack>
                  </HStack>
                </TransactionBox>
                <TransactionBox alterColor={alterColor}>
                  <HStack justify={{ md: "space-around" }}>
                    <Icon
                      as={MdArrowCircleDown}
                      w={10}
                      h={10}
                      color={"brand.success"}
                    />
                    <VStack>
                      <Text
                        fontWeight={"semibold"}
                        color={"brand.success"}
                        fontSize={{
                          base: "14",
                          md: "18",
                        }}
                      >
                        Income
                      </Text>
                      <Text
                        fontWeight={"bold"}
                        color={"brand.success"}
                        fontSize={{
                          base: "14",
                          md: "18",
                        }}
                      >
                        $10
                      </Text>
                    </VStack>
                  </HStack>
                </TransactionBox>
              </HStack>
              <Center pt={5}>
                <TransactionBox alterColor={alterColor}>
                  <HStack justify={{ md: "space-around" }}>
                    <Icon
                      as={CgArrowsExchangeAltV}
                      w={10}
                      h={10}
                      color={alterColor}
                    />
                    <VStack>
                      <Text
                        fontWeight={"semibold"}
                        color={alterColor}
                        fontSize={{
                          base: "14",
                          md: "18",
                        }}
                      >
                        Balance
                      </Text>
                      <Text
                        fontWeight={"bold"}
                        color={alterColor}
                        fontSize={{
                          base: "14",
                          md: "18",
                        }}
                      >
                        $10
                      </Text>
                    </VStack>
                  </HStack>
                </TransactionBox>
              </Center>
              <Flex w={"full"} align={"center"} justify={"center"}>
                <VStack w={"full"}>
                  <AddTransaction
                    alterColor={alterColor}
                    mainColor={mainColor}
                  />
                  <Box
                    borderWidth={2}
                    borderColor={alterColor}
                    w={"full"}
                    borderRadius={"xl"}
                  >
                    <HStack justify={"space-between"} px={2}>
                      <NextLink href={"/"} passHref>
                        <Link
                          textDecorationLine={"underline"}
                          _focus={{
                            outline: 0,
                          }}
                        >
                          Recent transactions
                        </Link>
                      </NextLink>
                      <NextLink href={"/"} passHref>
                        <Link
                          textDecorationLine={"underline"}
                          _focus={{
                            outline: 0,
                          }}
                        >
                          View all
                        </Link>
                      </NextLink>
                    </HStack>
                    <Box justify={"center"}>
                      {loading ? (
                        <Stack p={4}>
                          <Skeleton height="30px" />
                          <Skeleton height="30px" />
                          <Skeleton height="30px" />
                          <Skeleton height="30px" />
                        </Stack>
                      ) : (
                        transactions &&
                        transactions.map((transaction, index) => {
                          return (
                            <TransactionItem
                              key={index}
                              alterColor={alterColor}
                              color={
                                colorMode === "dark"
                                  ? findCategory(transaction.category)!.dColor
                                  : findCategory(transaction.category)!.lColor
                              }
                              category={
                                findCategory(transaction.category)!.icon
                              }
                              description={transaction.note}
                              amount={transaction.amount}
                              date={transaction.date}
                            />
                          );
                        })
                      )}
                    </Box>
                  </Box>
                </VStack>
              </Flex>
            </VStack>
          </Box>
        </Center>
      </Header>
    </>
  );
};

export default Home;
