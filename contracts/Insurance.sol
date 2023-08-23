// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract InsurancePool {
    uint premiumPrice;

    constructor(uint _premiumPrice) {
        premiumPrice = _premiumPrice;
    }

    struct Client {
        uint validEnd;
        uint lastClaimed;
    }

    mapping(address => Client) public clients;

    function payMonthlyPremium(address _client) external payable {
        require(
            block.timestamp >= clients[_client].validEnd,
            "1 month has not passed since last payment"
        );
        require(msg.value == premiumPrice, "Incorrect payment amount");

        clients[_client].validEnd = block.timestamp + 30 days;
    }

    function payYearlyPremium(address _client) external payable {
        require(
            block.timestamp >= clients[_client].validEnd,
            "12 months have not passed since last payment"
        );
        require(
            msg.value == (premiumPrice * 12 * 10) / 9,
            "Incorrect payment amount"
        );

        clients[_client].validEnd = block.timestamp + 365 days;
    }

    function claimInsurance(address _client, uint _value) external {
        require(
            clients[_client].lastClaimed < block.timestamp - 365 days,
            "Last claim happened this year"
        );
        require(
            _value <= premiumPrice * 12 * 2,
            "Requested amount exceeds maximum of 2 years worth of premium"
        );
        require(
            address(this).balance >= _value,
            "Insufficient funds to send the user"
        );

        clients[_client].lastClaimed = block.timestamp;
        payable(_client).transfer(_value);
    }

    function getPremiumPrice() external view returns (uint) {
        return (premiumPrice);
    }

    function getClientDetails(
        address _client
    ) external view returns (uint, uint) {
        return (clients[_client].validEnd, clients[_client].lastClaimed);
    }
}

contract InsurancePoolFactory {
    mapping(address => InsurancePool) public insurancePools;
    address[] public insurancePoolAddresses;

    modifier isValidPool(InsurancePool pool) {
        require(address(pool) != address(0), "Invalid pool address");
        _;
    }

    function createInsurancePool(uint _premium) external {
        InsurancePool newPool = new InsurancePool(_premium);
        insurancePools[msg.sender] = newPool;
        insurancePoolAddresses.push(address(newPool));
    }

    function getInsurancePools(
        uint _fromIndex
    ) external view returns (address[] memory) {
        require(_fromIndex < insurancePoolAddresses.length, "Invalid index");

        uint endIndex = _fromIndex + 5;
        if (endIndex > insurancePoolAddresses.length) {
            endIndex = insurancePoolAddresses.length;
        }

        address[] memory pools = new address[](endIndex - _fromIndex);
        for (uint i = _fromIndex; i < endIndex; i++) {
            pools[i - _fromIndex] = insurancePoolAddresses[i];
        }

        return pools;
    }

    function payMonthlyPremium(
        address _pool
    ) external payable isValidPool(insurancePools[_pool]) {
        InsurancePool pool = insurancePools[_pool];

        pool.payMonthlyPremium{value: msg.value}(msg.sender);
    }

    function payYearlyPremium(
        address _pool
    ) external payable isValidPool(insurancePools[_pool]) {
        InsurancePool pool = insurancePools[_pool];

        pool.payYearlyPremium{value: msg.value}(msg.sender);
    }

    function claimInsurance(
        address _pool,
        uint _value
    ) external isValidPool(insurancePools[_pool]) {
        InsurancePool pool = insurancePools[_pool];

        pool.claimInsurance(msg.sender, _value);
    }

    function getPremiumPrice(
        address _pool
    ) external view isValidPool(insurancePools[_pool]) returns (uint) {
        InsurancePool pool = insurancePools[_pool];

        return pool.getPremiumPrice();
    }

    function getClientDetails(
        address _pool
    ) external view isValidPool(insurancePools[_pool]) returns (uint, uint) {
        InsurancePool pool = insurancePools[_pool];

        return pool.getClientDetails(msg.sender);
    }
}
