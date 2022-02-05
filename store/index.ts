import create, { SetState } from "zustand";
import { supabase } from "../utils/supabaseClient";

export const useStore = create((set: SetState<any>) => ({
  user: supabase.auth.session()?.user,
  setUser: (user: any) => set({ user }, true),
  removeUser: () => set({ user: null }, true),
}));
