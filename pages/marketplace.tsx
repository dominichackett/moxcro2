import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Marketplace from "../src/components/MAIN/Marketplace";
import Login from "../src/components/Login";

const Home: NextPage = () => {
  const { isAuthenticated, enableWeb3, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
  }, []);

  if (!isAuthenticated) return <Login />;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>WILDCARD</title>
        <link rel="icon" href="/wildcardround.png" />
      </Head>

      <Marketplace />
    </div>
  );
};

export default Home;
