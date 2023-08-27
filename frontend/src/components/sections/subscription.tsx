import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePublicClient, useWalletClient } from "wagmi";
import data from "../interface.json";
import { useEffect, useState } from "react";

interface SubscriptionSectionProps {
  premiumPrice: number | undefined;
  currentPool: string | undefined;
}
export default function SubscriptionSection(props: SubscriptionSectionProps) {
  const [value, setValue] = useState<number>();

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  async function payMonthlyPremium() {
    if (!walletClient || !props.currentPool || !props.premiumPrice) {
      console.log("wallets not connected");
      return;
    }

    let _value = props.premiumPrice;

    const [address] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      abi: data.abi,
      address: `0x${data.address.substring(2)}`,
      functionName: "payMonthlyPremium",
      args: [props.currentPool],
      account: address,
      value: BigInt(_value),
    });

    const hash = await walletClient.writeContract(request);
  }

  async function payYearlyPremium() {
    if (!walletClient || !props.currentPool || !props.premiumPrice) {
      console.log("wallets not connected");
      return;
    }

    let _value = (props.premiumPrice * 12 * 10) / 9;

    const [address] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      abi: data.abi,
      address: `0x${data.address.substring(2)}`,
      functionName: "payYearlyPremium",
      args: [props.currentPool],
      account: address,
      value: BigInt(_value),
    });

    const hash = await walletClient.writeContract(request);
  }

  async function claimInsurance() {
    if (!walletClient || !props.currentPool) {
      console.log("wallets not connected");
      return;
    }

    const [address] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      abi: data.abi,
      address: `0x${data.address.substring(2)}`,
      functionName: "claimInsurance",
      args: [props.currentPool, value],
      account: address,
    });

    const hash = await walletClient.writeContract(request);
  }

  return (
    <>
      <p className="text-xl font-medium">Subscription & Claim</p>
      <br />
      <div className="flex gap-3 mb-6">
        <Button onClick={payMonthlyPremium}>Pay monthly premium</Button>
        <Button onClick={payYearlyPremium}>Pay yearly premium</Button>
      </div>
      <div className="flex gap-3">
        <Input
          className="max-w-xs"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          placeholder="Enter the amount to claim"
          type="number"
        />
        <Button onClick={claimInsurance}>Claim</Button>
      </div>
    </>
  );
}
