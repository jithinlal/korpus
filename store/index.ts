import create, { SetState } from "zustand";
import { supabase } from "../utils/supabaseClient";
import { User } from "@supabase/gotrue-js";

export const useStore = create((set: SetState<User | {}>) => ({
  user: supabase.auth.session()?.user,
  setUser: (user: User) => set({ user }, true),
  removeUser: set({ user: null }, true),
}));
