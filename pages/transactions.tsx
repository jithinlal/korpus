import { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Box,
  Button,
  Center,
  Skeleton,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import Header from "../components/Header";
import TransactionItem from "../components/TransactionItem";
import { findCategory } from "../utils/category";
import { supabase } from "../utils/supabaseClient";
import { useStore } from "../store/user";
import { TransactionStore } from "../types";

const Transactions: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionStore[] | []>([]);
  const [page, setPage] = useState(0);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const { from, to } = getPagination(page, 5);
    // setLoading(true);
    supabase
      .from("transactions")
      .select()
      .eq("created_by", useStore?.getState()?.user?.id)
      .order("created_at", { ascending: false })
      .range(from, to)
      .then(({ data, error }) => {
        setTransactions((transaction) => [
          ...transaction,
          ...(data as TransactionStore[]),
        ]);
        // setLoading(false);
      });
  }, [page]);

  return (
    <>
      <Header>
        <Center>
          <Box w={{ base: "full", lg: "50%" }}>
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
                    color={
                      colorMode === "dark"
                        ? findCategory(transaction.category)!.dColor
                        : findCategory(transaction.category)!.lColor
                    }
                    category={findCategory(transaction.category)!.icon}
                    description={transaction.note}
                    amount={transaction.amount}
                    date={transaction.date}
                  />
                );
              })
            )}
            <Center py={5}>
              <Button onClick={() => setPage(page + 1)}>Load more...</Button>
            </Center>
          </Box>
        </Center>
      </Header>
    </>
  );
};

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};

export default Transactions;
