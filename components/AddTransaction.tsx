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
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@chakra-ui/hooks";
import SelectComponent from "./Select";
import { AddTransactionProps } from "../types";
import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import dayjs from "dayjs";
import { supabase } from "../utils/supabaseClient";
import { MonthName } from "../utils/monthName";
import { useStore } from "../store/user";
import { useTransactionStore } from "../store/transaction";

const Calendar = dynamic(() => import("./Calendar"), {
  ssr: false,
});

const AddTransaction: FC<AddTransactionProps> = ({ alterColor, mainColor }) => {
  const modalInputBgColor = useColorModeValue("brand.white", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState(null);
  const [selectedDay, setSelectedDay] = useState<DayValue>({
    day: dayjs().date(),
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Calendar
                  selectedDay={selectedDay}
                  changeSelectedDay={setSelectedDay}
                />
              </HStack>
              <Input
                placeholder={"Note"}
                backgroundColor={modalInputBgColor}
                _focus={{
                  borderColor: modalInputBgColor,
                }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Box w={"full"}>
                <SelectComponent onChange={setCategory} />
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={alterColor}
              isLoading={loading}
              color={mainColor}
              _focus={{
                backgroundColor: modalInputBgColor,
                color: alterColor,
              }}
              onClick={async () => {
                if (category && selectedDay) {
                  setLoading(true);
                  const { data, error } = await supabase
                    .from("transactions")
                    .insert([
                      {
                        created_by: useStore?.getState()?.user?.id,
                        // @ts-ignore
                        category: +category.value,
                        note,
                        amount: +amount,
                        date: `${selectedDay.day} ${
                          MonthName[selectedDay.month - 1]
                        } ${selectedDay.year}`,
                      },
                    ]);
                  if (error) {
                    setLoading(false);
                  } else {
                    setLoading(false);
                    const { id, category, amount, date, note } = data as any;
                    useTransactionStore.setState((state) =>
                      state.addTransaction({
                        id: id,
                        category: category,
                        amount: amount,
                        date: date,
                        note: note,
                      })
                    );
                    onClose();
                  }
                }
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
