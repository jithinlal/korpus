import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Session, User } from "@supabase/gotrue-js";
import Login from "./login";
import { useStore } from "../store";
import Home from "../components/Home";

const Index: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log({ session });
      if (session) {
        useStore.setState((state) => state.setUser(session?.user as User));
      } else {
        useStore.setState((state) => state.removeUser);
      }
      setSession(session);
    });
  }, []);

  return <>{!session ? <Login /> : <Home />}</>;
};

export default Index;
