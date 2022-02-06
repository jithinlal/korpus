import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

const NavItem = (props: any) => {
  const { icon, children, ...rest } = props;
  const bgColor = useColorModeValue("brand.white", "brand.black");
  const alterColor = useColorModeValue("brand.black", "brand.white");

  return (
    <Flex
      align={"center"}
      px={4}
      mx={2}
      rounded={"md"}
      py={3}
      cursor={"pointer"}
      color={alterColor}
      _hover={{
        bg: alterColor,
        color: bgColor,
      }}
      role={"group"}
      fontWeight={"semibold"}
      transition={".15s ease"}
      {...rest}
    >
      {icon && (
        <Icon
          mr={2}
          boxSize={4}
          _groupHover={{
            color: bgColor,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

export default NavItem;
