import { Button } from "../ui/button";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function AuthSection() {
  const { open, close } = useWeb3Modal();

  const { status, isConnected, address } = useAccount();
  const [canShow, setCanShow] = useState<boolean>(false);

  useEffect(() => setCanShow(true), []);

  return (
    <>
      <h2>Storage Frontend</h2>
      <br />
      <Button onClick={() => open()}>Connect Wallet</Button>
      <br />
      {canShow && (
        <>
          <p>
            <span className="font-bold">Wallet Status</span> {status}
          </p>
          <p>
            <span className="font-bold">Address</span> {isConnected && address}
          </p>
        </>
      )}
    </>
  );
}

// premium payment and claim
