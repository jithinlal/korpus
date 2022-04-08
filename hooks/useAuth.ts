import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { useStore } from "../store/user";
import { Session } from "@supabase/gotrue-js";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(
    supabase.auth.session()
  );

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          useStore.setState({ user: session?.user });
          setSession(session);
          fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
          }).then((res) => res.json());
        } else {
          setSession(null);
        }
      }
    );

    return () => {
      if (authListener) authListener.unsubscribe();
    };
  }, []);

  return session;
};
