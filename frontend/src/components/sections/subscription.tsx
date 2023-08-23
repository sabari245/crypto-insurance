import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePublicClient, useWalletClient } from "wagmi";
import data from "../interface.json";
import { useEffect, useState } from "react";

export default function PoolCreateSection() {
  const [value, setValue] = useState<number>();

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  //   async function payMonthlyPremium(_pool, _value) {
  //     if (!walletClient) {
  //       console.log("wallets not connected");
  //       return;
  //     }

  //     const [address] = await walletClient.getAddresses();

  //     const { request } = await publicClient.simulateContract({
  //       abi: data.abi,
  //       address: `0x${data.address.substring(2)}`,
  //       functionName: "payMonthlyPremium",
  //       args: [_pool],
  //       account: address,
  //       value: _value,
  //     });

  //     const hash = await walletClient.writeContract(request);
  //   }

  //   async function payYearlyPremium(_pool, _value) {
  //     if (!walletClient) {
  //       console.log("wallets not connected");
  //       return;
  //     }

  //     const [address] = await walletClient.getAddresses();

  //     const { request } = await publicClient.simulateContract({
  //       abi: data.abi,
  //       address: `0x${data.address.substring(2)}`,
  //       functionName: "payYearlyPremium",
  //       args: [_pool],
  //       account: address,
  //       value: _value,
  //     });

  //     const hash = await walletClient.writeContract(request);
  //   }

  return (
    <>
      <p>Subscription & Claim</p>
      <br />
      <Button onClick={() => {}}>Pay monthly premium</Button>
      <br />
      <Button onClick={() => {}}>Pay yearly premium</Button>
      <br />
      <Input
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        placeholder="Enter the amount to claim"
        type="number"
      />
      <br />
      <Button onClick={() => {}}>Claim Insurance</Button>
    </>
  );
}
