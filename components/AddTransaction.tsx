import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@chakra-ui/hooks";
import SelectComponent from "./Select";
import { AddTransactionProps } from "../types";

const Calendar = dynamic(() => import("./Calendar"), {
  ssr: false,
});

const AddTransaction: FC<AddTransactionProps> = ({ alterColor, mainColor }) => {
  const modalInputBgColor = useColorModeValue("brand.white", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        my={2}
        bg={alterColor}
        color={mainColor}
        transition="background 0.5s"
        _focus={{
          backgroundColor: mainColor,
          color: alterColor,
        }}
      >
        Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <HStack>
                <Input
                  placeholder={"$"}
                  type={"number"}
                  backgroundColor={modalInputBgColor}
                  _focus={{
                    borderColor: modalInputBgColor,
                  }}
                />
                <Calendar />
              </HStack>
              <Input
                placeholder={"Note"}
                backgroundColor={modalInputBgColor}
                _focus={{
                  borderColor: modalInputBgColor,
                }}
              />
              <Box w={"full"}>
                <SelectComponent />
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={alterColor}
              color={mainColor}
              _focus={{
                backgroundColor: mainColor,
                color: alterColor,
              }}
            >
              ADD
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTransaction;
