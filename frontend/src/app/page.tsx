"use client";

import { AuthSection } from "@/components/sections/auth";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import data from "@/components/interface.json";
import PoolCreateSection from "@/components/sections/poolCreate";
import SubscriptionSection from "@/components/sections/subscription";
import InsuranceCreateSection from "@/components/sections/productInsuranceCreate";

export default function Home() {
  const [pool, setPool] = useState<string>();

  const [premiumPrice, setPremiumPrice] = useState<number>();

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (pool) {
      const main = async () => {
        const result = await publicClient.readContract({
          abi: data.abi,
          address: `0x${data.address.substring(2)}`,
          functionName: "getPremiumPrice",
          args: [pool],
        });

        setPremiumPrice(result as number);

        console.log(result);
      };

      main();
    }
  }, [pool]);

  return (
    <main className="p-8">
      <AuthSection />
      <Separator className="my-6" />
      <PoolCreateSection currentPool={pool} setCurrentPool={setPool} />
      <Separator className="my-6" />
      <SubscriptionSection currentPool={pool} premiumPrice={premiumPrice} />
      <Separator className="my-10" />
      <InsuranceCreateSection />
      <Separator className="my-6" />
    </main>
  );
}
