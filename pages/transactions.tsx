import { useState } from "react";
import { NextPage, GetServerSideProps } from "next";
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
import { useRouter } from "next/router";

// @ts-ignore
const Transactions: NextPage = ({ data: transactions, count, page }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();

  if (!supabase.auth.session()) {
    router.push("/");
  }

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
              transactions.map((transaction: any, index: number) => {
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
            {transactions.length < count && (
              <Center py={5}>
                <Button
                  onClick={() => router.push(`/transactions?page=${page + 1}`)}
                >
                  Load more...
                </Button>
              </Center>
            )}
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

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 0, id = null },
  req,
}) => {
  const { from, to } = getPagination(+page, 2);
  const { user, token } = await supabase.auth.api.getUserByCookie(req);
  supabase.auth.setAuth(token!);
  const { data, count } = await supabase
    .from("transactions")
    .select("*", { count: "exact" })
    .eq("created_by", user?.id)
    .order("created_at", { ascending: false })
    .range(0, to);

  return {
    props: {
      data: data,
      count: count,
      page: +page,
    },
  };
};

export default Transactions;
