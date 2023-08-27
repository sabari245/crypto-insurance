import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePublicClient, useWalletClient } from "wagmi";
import data from "../interface.json";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PoolCreateSectionProps {
  currentPool: string | undefined;
  setCurrentPool: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function PoolCreateSection({
  currentPool,
  setCurrentPool,
}: PoolCreateSectionProps) {
  const [pools, setPools] = useState<string[]>([]);
  const [poolPrice, setPoolPrice] = useState<number>(1);

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    async function getInsurancePools(_fromIndex: number) {
      const result = await publicClient.readContract({
        abi: data.abi,
        address: `0x${data.address.substring(2)}`,
        functionName: "getInsurancePools",
        args: [_fromIndex],
      });

      setPools(result as string[]);

      console.log(result);
    }

    getInsurancePools(0);
  }, []);

  useEffect(() => {
    if (pools.length > 0) {
      setCurrentPool(pools[0]);
    }
  }, [pools]);

  async function createInsurancePool(_premium: number) {
    if (!walletClient) {
      console.log("wallets not connected");
      return;
    }

    const [address] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      abi: data.abi,
      address: `0x${data.address.substring(2)}`,
      functionName: "createInsurancePool",
      args: [_premium],
      account: address,
    });

    const hash = await walletClient.writeContract(request);
  }

  return (
    <>
      <p className="text-xl font-medium">Create a pool</p>
      <br />
      <div className="flex gap-3">
        <Input
          className="max-w-xs"
          value={poolPrice}
          onChange={(e) => setPoolPrice(parseInt(e.target.value))}
          placeholder="Enter the premium amount"
          type="number"
        />
        <Button onClick={() => createInsurancePool(poolPrice)}>Create</Button>
      </div>

      {pools.length > 0 && (
        <>
          <br />
          <Select
            onValueChange={(value: string) => {
              setCurrentPool(value);
            }}
            defaultValue={currentPool}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {pools.map((pool) => (
                <SelectItem key={pool} value={pool}>
                  {pool}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
    </>
  );
}
