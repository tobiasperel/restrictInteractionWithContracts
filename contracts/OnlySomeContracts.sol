// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract OnlySomeContracts {
    mapping (address => address[]) private allowedContracts;
    mapping (address => uint) private balances;

    modifier isAllowedToInteract (address _contract){
        require(msg.value <= balances[msg.sender], "You don't have enough balance");
        require(isAllowedContract(_contract), "This contract is not allowed");
        _;
    }

    function addAllowedContract(address _contract) public {
        allowedContracts[msg.sender].push(_contract);
    }

    function getAllowedContract() public view returns (address[] memory) {
        return allowedContracts[msg.sender];
    }

    function addBalance(uint _amount) public payable {
        require(msg.value == _amount, "You must send the exact amount of ether");
        balances[msg.sender] += _amount;
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
    
    function isAllowedContract(address _contract) public view returns (bool) {
        for (uint i = 0; i < allowedContracts[msg.sender].length; i++) {
            if (allowedContracts[msg.sender][i] == _contract) {
                return true;
            }
        }
        return false;
    }

    function interactWithContract(address _contract) public payable isAllowedToInteract(_contract) {
        balances[msg.sender] -= msg.value;
        // rellenar con lo necesario
    }

}
