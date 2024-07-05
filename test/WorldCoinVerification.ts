import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

const WORLD_ID_ADDRESS = "0x38f6e15d86574b2d12ddc119b411C7027bcE349c";
const APP_ID = "test"
const ACTION_ID = "test"

describe("WorldCoinVerification", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner, second, third] = await hre.ethers.getSigners();


      const WorldVerifier = await hre.ethers.getContractFactory("WorldCoinVerification");
      const worldVerifier = await WorldVerifier.deploy(WORLD_ID_ADDRESS, APP_ID, ACTION_ID);

      return {owner, second, third, worldVerifier};
  }

    describe("Deployment", function () {
        it("Should set the right arguments", async function () {
            const {owner, worldVerifier} = await loadFixture(deployFixture)

            expect(await worldVerifier.worldId()).to.be.equal(WORLD_ID_ADDRESS)
        });
    });
});