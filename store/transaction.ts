import create from "zustand";
import { TransactionStore } from "../types";
import { supabase } from "../utils/supabaseClient";
import { useStore } from "./user";

interface TodoState {
  transactions: TransactionStore[];
  addTransaction: (transaction: TransactionStore) => void;
  fetchTransactions: () => void;
}

export const useTransactionStore = create<TodoState>((set) => ({
  transactions: [],
  fetchTransactions: async () => {
    const { error, data } = await supabase
      .from("transactions")
      .select()
      .eq("created_by", useStore?.getState()?.user?.id);
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
      transactions: [...state.transactions, transaction],
    })),
}));
