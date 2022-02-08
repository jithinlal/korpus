import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import NextLink from "next/link";
import NavItem from "./NavItem";

const SidebarContent = (props: any) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("brand.white", "brand.black");
  const borderColor = useColorModeValue("brand.black", "brand.white");

  return (
    <Box
      as={"nav"}
      pos={"fixed"}
      top={0}
      left={0}
      zIndex={"sticky"}
      h={"full"}
      pb={10}
      overflowX={"hidden"}
      overflowY={"auto"}
      borderColor={borderColor}
      bg={bgColor}
      borderRightWidth={"1px"}
      w={"60"}
      {...props}
    >
      <Flex px={4} py={5} align={"center"}>
        <AspectRatio r={1} w={20} onClick={toggleColorMode}>
          <Image
            src={
              colorMode === "light"
                ? "assets/logo_black.png"
                : "assets/logo_white.png"
            }
            alt={"Logo"}
          />
        </AspectRatio>
      </Flex>
      <Flex
        direction={"column"}
        as={"nav"}
        fontSize={"sm"}
        aria-label={"Main Navigation"}
      >
        <NavItem icon={MdHome}>
          <NextLink href={"/"} passHref>
            <Link
              _focus={{
                outline: 0,
              }}
              _hover={{
                textDecoration: "none",
              }}
              w={"full"}
            >
              Home
            </Link>
          </NextLink>
        </NavItem>
        <NavItem icon={GiMoneyStack}>
          <NextLink href={"/transactions"} passHref>
            <Link
              _focus={{
                outline: 0,
              }}
              _hover={{
                textDecoration: "none",
              }}
              w={"full"}
            >
              View all transactions
            </Link>
          </NextLink>
        </NavItem>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
