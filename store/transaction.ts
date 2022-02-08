import create from "zustand";
import { TransactionStore } from "../types";
import { supabase } from "../utils/supabaseClient";
import { useStore } from "./user";

interface TransactionState {
  transactions: TransactionStore[];
  addTransaction: (transaction: TransactionStore) => void;
  fetchTransactions: () => Promise<void>;
}

interface BalanceSheetState {
  balanceSheet: { income: number; spending: number; balance: number };
  fetchBalanceSheet: () => Promise<void>;
  updateBalanceSheet: (amount: number, type: string) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  fetchTransactions: async () => {
    const { error, data } = await supabase
      .from("transactions")
      .select()
      .eq("created_by", useStore?.getState()?.user?.id)
      .order("created_at", { ascending: false })
      .limit(5);
    if (!error) {
      const interTransactions = data!.map((item) => ({
        id: item.id,
        category: item.category,
        amount: item.amount,
        date: item.date,
        note: item.note,
      }));
      set({ transactions: interTransactions });
    } else {
      set({ transactions: [] });
    }
  },
  addTransaction: (transaction: TransactionStore) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
}));

export const useBalanceSheetStore = create<BalanceSheetState>((set) => ({
  balanceSheet: { income: 0, spending: 0, balance: 0 },
  fetchBalanceSheet: async () => {
    const { error, data } = await supabase.rpc("balance_sheet").select("*");
    if (!error) {
      if (data?.length !== 0) {
        const income = data!.find((item) => item.amount_type === "POSITIVE")
          ? data!.find((item) => item.amount_type === "POSITIVE").total_amount
          : 0;
        const spending = data!.find((item) => item.amount_type === "NEGATIVE")
          ? data!.find((item) => item.amount_type === "NEGATIVE").total_amount
          : 0;
        set({ balanceSheet: { income, spending, balance: income - spending } });
      }
    } else {
      set(() => ({
        balanceSheet: { income: 0, spending: 0, balance: 0 },
      }));
    }
  },
  updateBalanceSheet: (amount, type) =>
    set(({ balanceSheet }) => {
      if (type === "POSITIVE") {
        return {
          balanceSheet: {
            ...balanceSheet,
            income: balanceSheet.income + amount,
            balance: balanceSheet.balance + amount,
          },
        };
      } else {
        return {
          balanceSheet: {
            ...balanceSheet,
            spending: balanceSheet.spending + amount,
            balance: balanceSheet.balance - amount,
          },
        };
      }
    }),
}));
