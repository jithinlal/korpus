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
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import SidebarContent from "./SidebarContent";
import { useStore } from "../store/user";
import { supabase } from "../utils/supabaseClient";

const Header = ({ children }: { children: JSX.Element | string }) => {
  const sidebar = useDisclosure();
  const store = useStore();
  const bgColor = useColorModeValue("brand.white", "brand.black");
  const borderColor = useColorModeValue("brand.black", "brand.white");
  const { toggleColorMode, colorMode } = useColorMode();
  const user = useStore.getState().user;

  return (
    <Box as={"section"} minH={"100vh"}>
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
      <Box transition={".3s ease"} p={2}>
        <Flex
          as={"header"}
          align={"center"}
          justify={"space-between"}
          w={"full"}
          px={4}
          bg={bgColor}
          borderWidth={2}
          borderRadius={{ base: "md", md: "lg" }}
          borderColor={borderColor}
          h={14}
        >
          <IconButton
            aria-label={"Menu"}
            display={"inline-flex"}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size={"sm"}
            _focus={{
              outline: 0,
            }}
          />
          <Box
            borderWidth={2}
            px={2}
            borderColor={borderColor}
            borderRadius={"xl"}
            borderStyle="dashed"
          >
            <Text fontSize="2xl" fontWeight={"bold"}>
              Korpus
            </Text>
          </Box>
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
                }}
              />
              <MenuList>
                <MenuItem onClick={toggleColorMode}>
                  Set {colorMode === "light" ? "dark theme" : "light theme"}
                </MenuItem>
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
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
