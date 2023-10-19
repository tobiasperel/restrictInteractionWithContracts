import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("onlySomeContract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function SomeContract() {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const onlySomeContract = await ethers.getContractFactory("OnlySomeContracts");
    const OnlySomeContract = await onlySomeContract.deploy();

    return { OnlySomeContract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("should add an address", async function () {
        const { OnlySomeContract, owner, otherAccount } = await loadFixture(SomeContract);
        await OnlySomeContract.addAllowedContract("0xa33064F56aeBE8d63048E16Bd388AEf498fB2571");
        await OnlySomeContract.addAllowedContract("0x4310a5f4Bb3b4Ff09f0694218fA50D2767a00b86");
        console.log (await OnlySomeContract.getAllowedContract() ) 
       // expect(await OnlySomeContract.getAllowedContract()).to.equal([ '0xa33064F56aeBE8d63048E16Bd388AEf498fB2571' ]);
    });
    it("addBalance", async function () { //add 1 ether
      const { OnlySomeContract, owner, otherAccount } = await loadFixture(SomeContract);
      await OnlySomeContract.addBalance(100000000000,{value:100000000000});
      expect(await OnlySomeContract.getBalance()).to.equal(100000000000);
    });
    it("interactWithContract", async function () { //add 1 ether
      const { OnlySomeContract, owner, otherAccount } = await loadFixture(SomeContract);
      await OnlySomeContract.addBalance(100000000000,{value:100000000000});
      await OnlySomeContract.addAllowedContract("0xa33064F56aeBE8d63048E16Bd388AEf498fB2571");
      console.log (await OnlySomeContract.interactWithContract("0xa33064F56aeBE8d63048E16Bd388AEf498fB2571",{value:100000000000}) ) ; 
      });



  });


});
