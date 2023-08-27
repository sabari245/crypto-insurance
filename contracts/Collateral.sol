// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Insurance {
    uint public loanAmount;
    uint public initialCollateralValue;
    uint public collateralValue;
    uint public percentageCoverage;
    uint public nextPaymentDate;
    uint public lastClaimDate;

    constructor(uint _collateralValue, uint _percentageCoverage) {
        loanAmount = (_collateralValue * 5) / 100;
        percentageCoverage = _percentageCoverage;
        collateralValue = _collateralValue;
        initialCollateralValue = _collateralValue;
    }

    function updateCollateralValue(uint _newCollateralValue) external {
        collateralValue = _newCollateralValue;
    }

    function payPremium() external payable {
        require(
            block.timestamp >= nextPaymentDate,
            "Its too soon the pay the premium"
        );
        require(msg.value == loanAmount, "Incorrent Amount");

        nextPaymentDate = block.timestamp + 30 days;
    }

    function claimInsurance(address _client) external {
        // TODO: calculate tha amount and return the payment ( once a year )
        // require(
        //     initialCollateralValue - collateralValue > 0,
        //     "The collateral value is not down"
        // );
        uint amountToPay = loanAmount;
        require(
            lastClaimDate < block.timestamp - 365 days,
            "Last claim happened this year"
        );
        require(
            address(this).balance >= amountToPay,
            "Insufficient funds to send the user"
        );

        lastClaimDate = block.timestamp;
        payable(_client).transfer(amountToPay);
    }
}

contract InsuranceFactory {
    mapping(address => Insurance) public insurances;

    function createInsurance(
        uint _collateralValue,
        uint _percentageCoverage
    ) external {
        Insurance newInsurance = new Insurance(
            _collateralValue,
            _percentageCoverage
        );
        insurances[msg.sender] = newInsurance;
    }

    function getCollateralValue() external view returns (uint256) {
        return insurances[msg.sender].collateralValue();
    }

    function getPremiumAmount() external view returns (uint256) {
        return insurances[msg.sender].loanAmount();
    }

    function updateCollateralValue(uint _newCollateralValue) external {
        insurances[msg.sender].updateCollateralValue(_newCollateralValue);
    }

    function payPremium() external payable {
        insurances[msg.sender].payPremium{value: msg.value}();
    }

    function claimInsurance() external {
        insurances[msg.sender].claimInsurance(msg.sender);
    }
}
