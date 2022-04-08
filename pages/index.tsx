import type { NextPage } from "next";
import Login from "./login";
import Home from "../components/Home";
import { useAuth } from "../hooks/useAuth";

const Index: NextPage = () => {
  const session = useAuth();

  return <>{!session ? <Login /> : <Home />}</>;
};

export default Index;
