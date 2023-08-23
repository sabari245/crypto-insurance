import { expect } from "chai";
import { ethers } from "hardhat";


describe("OrganizationProxy Contract", () => {

        async function deployContract() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const contract = await ethers.deployContract("InsurancePoolFactory");
        await contract.waitForDeployment();

        return { contract, owner, addr1, addr2 };
    }

    // it("should create an organization and update ownership", async function () {

    //     const {contract, owner, addr1} = await deployContract();
    //     const organizationProxyContract = contract;
    //     const member = addr1;

    //     await organizationProxyContract.createOrganization("MyOrg", "ORG", 1000);
    //     await organizationProxyContract.updateOwner(member.address);

    //     const [orgOwner, , ] = await organizationProxyContract.getVestingInfo(owner.address);
    //     expect(orgOwner).to.equal(member.address);
    // });

    it("should add a member to the organization via proxy", async function () {

        const {contract, owner, addr1} = await deployContract();
        const organizationProxyContract = contract;
        const member = addr1;

        const initialTokens = 500;
        const vestingPeriod = 0;

        await organizationProxyContract.createOrganization("MyOrg", "ORG", 1000);
        await organizationProxyContract.addMember(addr1.address, initialTokens, vestingPeriod);

        const [remainingTokens, , ] = await organizationProxyContract.getVestingInfo(owner.address, addr1.address);
        expect(remainingTokens).to.equal(initialTokens);
    });

    it("should return the details of organization", async function () {
        const {contract, owner} = await deployContract();
        const organizationProxyContract = contract;
        
        await organizationProxyContract.createOrganization("MyOrg", "ORG", 1000);
        const [name, token, value] = await organizationProxyContract.getOrganizationDetailsOfSender();

        expect(name).to.equal("MyOrg");
        expect(token).to.equal("ORG");
        expect(value).to.equal(1000);
    });


});
