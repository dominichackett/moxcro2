import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
  WildCardAddress,
  WildCardABI,
} from "../../Contracts/WildCardNFTContract";

import { USDCAddress, USDCABI } from "../../Contracts/USDCContract";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";

const product = {
  name: "Sticker Pack (6 Cards)",
  price: "$10",
  images: [
    {
      id: 1,
      name: "Pack",
      src: "/Playerpack.png",
    },
  ],

  description: `
    <p>A Sticker Pack comes with 6 randomly selected World Cup Players. You need at least 11 Players to participate in the Manager Tournament. You can sell individual Players on the open Marketplace.</p>
  `,
};

export default function Stickerpack() {
  const { Moralis, web3, user, enableWeb3, isWeb3Enabled } = useMoralis();

  //  CONTRACT CALL
  async function purchasePack() {
    if (!isWeb3Enabled) enableWeb3();
    const result = await Moralis.Cloud.run("getCard", {});
    console.log(result);

    const approveUSDC = new ethers.Contract(
      USDCAddress,
      USDCABI,
      web3.getSigner()
    );

    let approval = await approveUSDC.approve(user.get("ethAddress"), 10);

    const WildcardContract = new ethers.Contract(
      WildCardAddress,
      WildCardABI,
      web3.getSigner()
    );

    let transaction = await WildcardContract.mintCard(result);
    const receipt = await transaction.wait();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto w-8/12 max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            <Tab.Panels className="">
              {product.images.map((image) => (
                <Tab.Panel key={image.id}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-50 w-50 sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.price}
              </p>
            </div>

            {/* Reviews */}

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <div className="mt-6">
              <div className="sm:flex-col1 mt-10 flex">
                <button
                  onClick={purchasePack}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-cyan-600 py-3 px-8 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Purchase Pack
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
