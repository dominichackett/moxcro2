import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Dashboard from "../src/components/Dashboard";
import Login from "../src/components/Login";

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) return <Login />;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>WILDCARD</title>
        <link rel="icon" href="/wildcardround.png" />
      </Head>

      <Dashboard />
      {/* <Manager /> */}
    </div>
  );
};

export default Home;
