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

export default function PoolCreateSection() {
  const [pools, setPools] = useState<string[]>([]);

  const [currentPool, setCurrentPool] = useState<string>();

  useEffect(() => {
    if (pools.length > 0) {
      setCurrentPool(pools[0]);
    }
  }, [pools]);

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  function handleCurrentClient(addr: string) {
    // TODO: nothing
  }

  return (
    <>
      <p>Create a pool</p>
      <br />
      <Button onClick={() => {}}>Create</Button>
      <br />
      {pools.length > 0 && (
        <Select
          onValueChange={(value: string) => {
            setCurrentPool(value);
          }}
          defaultValue={currentPool}
        >
          <SelectTrigger className="ml-auto w-[110px]">
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
      )}
    </>
  );
}
