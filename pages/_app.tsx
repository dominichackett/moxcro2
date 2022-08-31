import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "../src/MoralisDappProvider/MoralisDappProvider";
import { env } from "../next.config";

// const APP_ID = process.env.NEXT_APP_MORALIS_APP_ID;
const APP_ID = "PwE9zZL74dyQiIdDo5qFP1uUIkq6xTVgiP9ul7Fb";
// const SERVER_URL = process.env.NEXT_APP_MORALIS_SERVER_URL;
const SERVER_URL = "https://fscxsw3halcr.usemoralis.com:2053/server";

function MoxCro({ Component, pageProps }: AppProps) {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //validate
  if (!APP_ID || !SERVER_URL) throw new Error("Missing Moralis Credentials");
  if (isServerInfo)
    return (
      <MoralisProvider
        appId={APP_ID}
        serverUrl={SERVER_URL}
        initializeOnMount={true}
      >
        <MoralisDappProvider>
          <Component {...pageProps} />
        </MoralisDappProvider>
      </MoralisProvider>
    );
}

export default MoxCro;
