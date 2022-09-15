import {
  CurrencyDollarIcon,
  FireIcon,
  GlobeAltIcon,
  GlobeIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const transactions = [
  {
    id: 1,
    name: "Bought Playerpack from Marketplace",
    href: "#",
    amount: "$10",
    currency: "USDC",
    status: "success",
    date: "August 20, 2022",
    datetime: "2022-08-20",
  },
  {
    id: 1,
    name: "Sold Player on Open Market",
    href: "#",
    amount: "5",
    currency: "CRO",
    status: "success",
    date: "September 5, 2022",
    datetime: "2022-09-5",
  },
  {
    id: 1,
    name: "Bought Playerpack from Marketplace",
    href: "#",
    amount: "$10",
    currency: "USDC",
    status: "success",
    date: "September 10, 2022",
    datetime: "2022-09-10",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Account() {
  const { Web3API } = useMoralisWeb3Api();

  const { user, Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();
  const [player, setPlayer] = useState([]);
  const [legendary, setLegendary] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();

    //  GET ALL PLAYERS OWNED BY USER
    const fetchNFTs = async () => {
      const testnetNFTs = await Web3API.account.getNFTs({
        chain: "cronos testnet",
      });
      let _players = [];
      let l = [];
      testnetNFTs.result.forEach(async (nft) => {
        if (nft.token_address == "0x396fb51aefcdef80e4b2514cba310787f3ffa74d") {
          const tokenIdMetadata = await Moralis.Cloud.run("Metadata", {
            tokenId: nft.token_id,
          });
          _players.push(tokenIdMetadata);

          if (tokenIdMetadata.attributes[4].value == "legendary")
            l.push(tokenIdMetadata);
        }
      });
      console.log(_players);
      setPlayer(_players);
      setLegendary(l);
    };
    fetchNFTs();

    //  GET ONLY LEGENDARY PLAYERS
    // const Player2 = Moralis.Object.extend("Player");
    // const query2 = new Moralis.Query(Player2);
    // query2.equalTo("type", "legendary");
    // query2.find().then((results) => {
    //   let l = [];
    //   results.forEach((result) => {
    //     l.push(result.get("type"));
    //   });
    //   setLegendary(l);
    // });

    //  QUERY TOTAL POINTS
    const fetchPoints = async () => {
      const LeaderBoard = Moralis.Object.extend("LeaderBoard");
      const query3 = new Moralis.Query(LeaderBoard);
      query3.equalTo("address", user.get("ethAddress"));
      const result = await query3.first();
      if (result) setTotalPoints(result.get("points"));
    };
    fetchPoints();
  }, []);

  return (
    <main className="flex-1 pb-8">
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0">
              {/* Profile */}
              <div className="flex items-center">
                <img
                  className="hidden h-16 w-16 rounded-full sm:block"
                  src="/wildcardround.png"
                  alt=""
                />
                <div>
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 rounded-full sm:hidden"
                      src="/wildcardround.png"
                    />
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      Welcome{" "}
                      {user.get("ethAddress").slice(0, 4).concat("...") +
                        user.get("ethAddress").slice(38, 42)}
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt className="sr-only">Company</dt>
                    <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                      <GlobeAltIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      FIFA WORLD CUP
                    </dd>
                    <dt className="sr-only">Account status</dt>
                    <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                      <CheckCircleIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      Verified account
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Overview
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <GlobeIcon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Points
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {totalPoints}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Player NFTs
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {player.length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FireIcon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Legendary
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {legendary.length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Activity
        </h2>

        {/* Activity list (smallest breakpoint only) */}
        <div className="shadow sm:hidden">
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
          >
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <a
                  href={transaction.href}
                  className="block px-4 py-4 bg-white hover:bg-gray-50"
                >
                  <span className="flex items-center space-x-4">
                    <span className="flex-1 flex space-x-2 truncate">
                      <CashIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="flex flex-col text-gray-500 text-sm truncate">
                        <span className="truncate">{transaction.name}</span>
                        <span>
                          <span className="text-gray-900 font-medium">
                            {transaction.amount}
                          </span>{" "}
                          {transaction.currency}
                        </span>
                        <time dateTime={transaction.datetime}>
                          {transaction.date}
                        </time>
                      </span>
                    </span>
                    <ChevronRightIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Activity table (small breakpoint and up) */}
        <div className="hidden sm:block">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mt-2">
              <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        Transaction
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        Amount
                      </th>
                      <th
                        className="hidden px-6 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900 md:block"
                        scope="col"
                      >
                        Status
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="bg-white">
                        <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex">
                            <a
                              href={transaction.href}
                              className="group inline-flex space-x-2 truncate text-sm"
                            >
                              <CashIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <p className="text-gray-500 truncate group-hover:text-gray-900">
                                {transaction.name}
                              </p>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900 font-medium">
                            {transaction.amount}{" "}
                          </span>
                          {transaction.currency}
                        </td>
                        <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                          <span
                            className={classNames(
                              statusStyles[transaction.status],
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                            )}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <time dateTime={transaction.datetime}>
                            {transaction.date}
                          </time>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
