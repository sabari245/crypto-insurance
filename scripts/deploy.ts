import { ethers } from "hardhat";
import { writeFileSync } from "fs"

const OUTPUT_FILE = "./frontend/src/components/interface.json"

async function main() {
  const Storage = await ethers.deployContract("InsurancePoolFactory");

  const storageInstance = await Storage.waitForDeployment();

  const data = {
    address: await storageInstance.getAddress(),
    abi: JSON.parse(storageInstance.interface.formatJson())
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(data));
  console.log(`the address and the abi is stored in: \n\t${OUTPUT_FILE}`)


  const InsuranceFactory = await ethers.getContractFactory("InsuranceFactory");
  const insuranceFactory = await InsuranceFactory.deploy();

  const insuranceFactoryInstance = await insuranceFactory.waitForDeployment();

  const data2 = {
    address: await insuranceFactoryInstance.getAddress(),
    abi: JSON.parse(insuranceFactoryInstance.interface.formatJson())
  }

  writeFileSync("./frontend/src/components/interface2.json", JSON.stringify(data2));
  console.log(`the address and the abi is stored in: \n\t./frontend/src/components/interface2.json`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
