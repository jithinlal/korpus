import Header from "./Header";
import {
  Box,
  Center,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { MdArrowCircleUp, MdArrowCircleDown } from "react-icons/md";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import TransactionBox from "./TransactionBox";

const Home = () => {
  const alterColor = useColorModeValue("brand.black", "brand.white");
  return (
    <>
      <Header>
        <Box h={{ base: "auto", md: "100vh" }}>
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
          </VStack>
        </Box>
      </Header>
    </>
  );
};

export default Home;
