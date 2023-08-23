"use client";

import { AuthSection } from "@/components/sections/auth";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import data from "@/components/interface.json";

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
    <main>
      <AuthSection />
      <Separator className="my-6" />
    </main>
  );
}
