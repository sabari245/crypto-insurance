import { PublicClient, WalletClient, usePublicClient, useWalletClient } from "wagmi";
import data from "./interface2.json";

type GetWalletClientResult = WalletClient | null;

async function getPremiumAmount(publicClient: PublicClient, GetWalletClientResult: GetWalletClientResult | undefined) {
    const result = await publicClient.readContract({
        abi: data.abi,
        address: `0x${data.address.substring(2)}`,
        functionName: "getPremiumAmount",
        args: [],
    });

    console.log(result);
    return result as number;
}


async function createInsurance(publicClient: PublicClient, GetWalletClientResult: GetWalletClientResult | undefined, _collateralValue: number, _percentageCoverage: number) {
    if (!GetWalletClientResult) {
        console.log("wallets not connected");
        return;
    }

    const [address] = await GetWalletClientResult.getAddresses();

    const { request } = await publicClient.simulateContract({
        abi: data.abi,
        address: `0x${data.address.substring(2)}`,
        functionName: "createInsurance",
        args: [_collateralValue, _percentageCoverage],
        account: address,
    });

    const hash = await GetWalletClientResult.writeContract(request);
}

async function updateCollateralValue(publicClient: PublicClient, GetWalletClientResult: GetWalletClientResult | undefined, _newCollateralValue: number) {
    if (!GetWalletClientResult) {
        console.log("wallets not connected");
        return;
    }

    const [address] = await GetWalletClientResult.getAddresses();

    const { request } = await publicClient.simulateContract({
        abi: data.abi,
        address: `0x${data.address.substring(2)}`,
        functionName: "updateCollateralValue",
        args: [_newCollateralValue],
        account: address,
    });

    const hash = await GetWalletClientResult.writeContract(request);
}

async function payPremium(publicClient: PublicClient, GetWalletClientResult: GetWalletClientResult | undefined) {
    if (!GetWalletClientResult) {
        console.log("wallets not connected");
        return;
    }

    const [address] = await GetWalletClientResult.getAddresses();

    const { request } = await publicClient.simulateContract({
        abi: data.abi,
        address: `0x${data.address.substring(2)}`,
        functionName: "payPremium",
        args: [],
        account: address,
        value: BigInt(await getPremiumAmount(publicClient, GetWalletClientResult)),
    });

    const hash = await GetWalletClientResult.writeContract(request);
}

async function claimInsurance(publicClient: PublicClient, GetWalletClientResult: GetWalletClientResult | undefined) {
    if (!GetWalletClientResult) {
        console.log("wallets not connected");
        return;
    }

    const [address] = await GetWalletClientResult.getAddresses();

    const { request } = await publicClient.simulateContract({
        abi: data.abi,
        address: `0x${data.address.substring(2)}`,
        functionName: "claimInsurance",
        args: [],
        account: address,
    });

    const hash = await GetWalletClientResult.writeContract(request);
}

async function getCollateralValue(publicClient: PublicClient, walletClient: GetWalletClientResult | undefined) {
    const result = await publicClient.readContract({
        abi: data.abi,
        address: `0x${data.address.substring(2)}`,
        functionName: "getCollateralValue",
        args: [],
    });

    console.log(result);
    return result as number;
}


export {
    getPremiumAmount,
    createInsurance,
    updateCollateralValue,
    payPremium,
    claimInsurance,
    getCollateralValue,
};

