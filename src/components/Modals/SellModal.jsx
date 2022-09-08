/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CreditCardIcon } from "@heroicons/react/outline";
import { ethers } from "ethers";
import {
  MarketplaceAddress,
  MarketplaceABI,
} from "../../Contracts/MarketplaceContract";
import {
  WildCardAddress,
  WildCardABI,
} from "../../Contracts/WildCardNFTContract";
import { useMoralis } from "react-moralis";

export default function SellModal(props) {
  const { web3, Moralis, user } = useMoralis();
  const [open, setOpen] = useState(true);
  const [approveSale, setApproveSale] = useState(true);

  const cancelButtonRef = useRef(null);

  // APPROVE SALES FOR MARKETPLACE
  const approveSales = async () => {
    const approveMarketSale = new ethers.Contract(
      WildCardAddress,
      WildCardABI,
      web3.getSigner()
    );
    // let approval = await approveMarketSale.setApprovalForAll(
    //   MarketplaceAddress,
    //   true
    // );
    // await approval.wait();
  };

  // .isApprovedForAll(user.get("ethAddress"), MarketplaceAddress)
  // .then(() => setApproveSale(true));
  // CHECK IF PLAYERS HAVE BEEN APPROVED FOR SALE

  //   const usdcContract = new ethers.Contract(USDCAddress,USDCABI,web3.getSigner());
  //         let transaction = await usdcContract.allowance(
  //           user.get('ethAddress'),FounderNFT
  //         );
  //         //const value = transaction;
  //         setGotApprovedUSDC(true)
  //         setApprovedUSDC((transaction.gt(0) ? true: false));
  //         console.log(transaction.gt(0))

  //   useEffect(() => {
  //     const
  // if() {

  //   setApproveSale(true)
  // }

  //   }, []);

  // CONTRACT CALL SELL PLAYER
  const sellPlayer = async () => {
    const sellingPrice = document.getElementById("price").value;
    console.log(sellingPrice);

    const sellPlayerContract = new ethers.Contract(
      MarketplaceAddress,
      MarketplaceABI,
      web3.getSigner()
    );

    let transaction = await sellPlayerContract.listToken(
      WildCardAddress,
      props.player.tokenId,
      1,
      sellingPrice
    );
    await transaction
      .wait()
      .then(() => alert("player successfully listed on the marketplace"));
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100">
                    <CreditCardIcon
                      className="h-6 w-6 text-cyan-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Sell Player
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to sell your player on the open
                        Market?
                      </p>
                      <div className="my-8">
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                            {/* <span className="text-gray-500 sm:text-sm">$</span> */}
                          </div>
                          <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span
                              className="text-gray-500 sm:text-sm"
                              id="price-currency"
                            >
                              CRO
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {!approveSale ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={approveSales}
                    >
                      Approve Sale
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={sellPlayer}
                    >
                      Sell Player
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
