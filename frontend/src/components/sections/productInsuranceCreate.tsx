import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  claimInsurance,
  createInsurance,
  getCollateralValue,
  payPremium,
  updateCollateralValue,
} from "../interface";
import { usePublicClient, useWalletClient } from "wagmi";

interface InsuranceFormProps {
  onSubmit: (premium: number, coverage: number) => void;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ onSubmit }) => {
  const [premium, setPremium] = useState<number>(0);
  const [coverage, setCoverage] = useState<number>(25);

  return (
    <>
      <div className="flex gap-3 mb-6">
        <Input
          className="max-w-xs"
          id="premium"
          type="number"
          placeholder="Enter the collateral Value"
          value={premium}
          onChange={(e) => setPremium(parseInt(e.target.value))}
        />
        <Select
          onValueChange={(e) => setCoverage(parseInt(e))}
          defaultValue={coverage.toString()}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25%</SelectItem>
            <SelectItem value="50">50%</SelectItem>
            <SelectItem value="75">75%</SelectItem>
            <SelectItem value="100">100%</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={() => onSubmit(premium, coverage)}>
        Create Insurance
      </Button>
    </>
  );
};

interface CollateralFormProps {
  onSubmit: (collateralValue: number) => void;
}

const CollateralForm: React.FC<CollateralFormProps> = ({ onSubmit }) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [collateralValue, setCollateralValue] = useState<number>(0);
  const [contractCollateralValue, setContractCollateralValue] =
    useState<number>(0);

  return (
    <>
      <p className="text-xl font-medium">Update Collateral Value</p>
      <p>
        <span className="font-bold">Collateral Value :</span>{" "}
        {contractCollateralValue.toString()}{" "}
      </p>
      <Button
        className="mb-6"
        onClick={() =>
          getCollateralValue(publicClient, walletClient).then((res) => {
            setContractCollateralValue(res);
          })
        }
      >
        Update
      </Button>
      <br />
      <div className="flex gap-3">
        <Input
          className="max-w-xs"
          value={collateralValue}
          onChange={(e) => setCollateralValue(parseInt(e.target.value))}
          placeholder="New Collateral Value"
          type="number"
        />
        <Button onClick={() => onSubmit(collateralValue)}>Update</Button>
      </div>
    </>
  );
};

function PayAndClaim() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  return (
    <>
      <p className="text-xl font-medium">Pay & Claim</p>
      <br />
      <div className="flex gap-3 mb-6">
        <Button onClick={() => payPremium(publicClient, walletClient)}>
          Pay Premium
        </Button>
        <Button onClick={() => claimInsurance(publicClient, walletClient)}>
          Claim Insurance
        </Button>
      </div>
    </>
  );
}

export default function InsuranceCreateSection() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const handleInsuranceSubmit = (value: number, coverage: number) => {
    // onCreateInsurance(premium, coverage);
    createInsurance(publicClient, walletClient, value, coverage);
  };

  const handleCollateralSubmit = (collateralValue: number) => {
    // onUpdateCollateralValue(collateralValue);
    updateCollateralValue(publicClient, walletClient, collateralValue);
  };

  return (
    <>
      <p className="text-xl font-medium">Create a Insurance for Collateral</p>
      <br />
      <InsuranceForm onSubmit={handleInsuranceSubmit} />
      <br />
      <CollateralForm onSubmit={handleCollateralSubmit} />
      <br />
      <PayAndClaim />
    </>
  );
}
