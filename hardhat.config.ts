import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/aeb085248fd14c89a9635a8ac81321fa",
      accounts: ["<your account>"]
    }
  }
};

export default config;
