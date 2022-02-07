import {
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
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { AddTransactionProps } from "../types";
import { useDisclosure } from "@chakra-ui/hooks";
import SelectComponent from "./Select";

const AddTransaction: FC<AddTransactionProps> = ({ alterColor, mainColor }) => {
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
                <Input placeholder={"Amount"} type={"number"} />
                <Input placeholder={"Date"} type={"date"} />
              </HStack>
              <Input placeholder={"Note"} />
              <SelectComponent />
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
