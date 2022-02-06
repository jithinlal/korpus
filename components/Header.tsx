import { useDisclosure } from "@chakra-ui/hooks";
import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import SidebarContent from "./SidebarContent";
import { useStore } from "../store";
import { supabase } from "../utils/supabaseClient";

const Header = () => {
  const sidebar = useDisclosure();
  const store = useStore();
  const bgColor = useColorModeValue("brand.white", "brand.black");
  const borderColor = useColorModeValue("brand.black", "brand.white");
  const user = useStore.getState().user;

  return (
    <Box as={"section"} minH={"100vh"}>
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement={"left"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w={"full"} borderRight={"none"} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition={".3s ease"}>
        <Flex
          as={"header"}
          align={"center"}
          justify={{ base: "space-between", md: "flex-end" }}
          w={"full"}
          px={4}
          bg={bgColor}
          borderBottomWidth={1}
          borderColor={borderColor}
          h={"14"}
        >
          <IconButton
            aria-label={"Menu"}
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size={"sm"}
            _focus={{
              outline: 0,
            }}
          />
          <Flex align={"center"}>
            <Menu isLazy>
              <MenuButton
                as={IconButton}
                aria-label={"Account"}
                variant="outline"
                icon={
                  <Avatar
                    size={"sm"}
                    name={user?.email}
                    bg={borderColor}
                    color={bgColor}
                  />
                }
                border={"none"}
                backgroundColor={bgColor}
                _active={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: bgColor,
                }}
                _hover={{
                  boxShadow: "none",
                  backgroundColor: bgColor,
                }}
                _focus={{
                  outline: 0,
                  // boxShadow:
                  //   colorMode === "light"
                  //     ? "0 0 0 0 rgba(0, 0, 0, 0)"
                  //     : "0 0 0 0 rgba(255, 255, 255, 0.92)",
                }}
              />
              <MenuList>
                <MenuItem>{user?.email}</MenuItem>
                <MenuItem
                  onClick={() => {
                    supabase.auth.signOut();
                    store.removeUser;
                  }}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        <Box as={"main"} p={4}>
          <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
