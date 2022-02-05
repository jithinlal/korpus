import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Session } from "@supabase/gotrue-js";
import Login from "./login";

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log({ session });
      setSession(session);
    });
  }, []);

  return <>{!session ? <Login /> : <p>You are here</p>}</>;
};

export default Home;
