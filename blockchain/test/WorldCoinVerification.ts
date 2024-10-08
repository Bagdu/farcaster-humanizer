import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
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

      const WorldIDMock = await hre.ethers.getContractFactory("WorldIDMock");
      const worldIdMock = await WorldIDMock.deploy()

      const WorldVerifier = await hre.ethers.getContractFactory("WorldCoinVerification");
      const worldVerifier = await WorldVerifier.deploy(worldIdMock.getAddress(), APP_ID, ACTION_ID);

      return {owner, second, third, worldVerifier, worldIdMock};
  }

    describe("Deployment", function () {
        it("Should set the right arguments", async function () {
            const {worldIdMock, worldVerifier} = await loadFixture(deployFixture)

            expect(await worldVerifier.worldId()).to.be.equal(await worldIdMock.getAddress())
        });
    });

  describe("Verification", function (){
    it("Should verify correctly", async function () {
      const {owner, worldIdMock, worldVerifier} = await loadFixture(deployFixture)
      await worldVerifier.verify(
            1234,
            123,
            23232,
            [1, 2, 3, 4, 5 , 6, 7 ,8]
        )

        expect(await worldVerifier.isVerified(1234))
            .to.be.equal(true)

        expect(await worldVerifier.isVerified(12345))
            .to.be.equal(false)

        await worldVerifier.verify(
          12345,
            123,
            23233,
            [1, 2, 3, 4, 5 , 6, 7 ,8]
        )

        expect(await worldVerifier.isVerified(12345))
          .to.be.equal(true)

    });

    it("Should rever while verifying twice", async function () {
        const {owner, worldIdMock, worldVerifier} = await loadFixture(deployFixture)
        await worldVerifier.verify(
            1234,
            123,
            23232,
            [1, 2, 3, 4, 5 , 6, 7 ,8]
        )


        await expect(worldVerifier.verify(
            1234,
            123,
            23232,
            [1, 2, 3, 4, 5 , 6, 7 ,8]
        )).to.be
            .revertedWith("WorldCoinVerification: World id user has already verified the farcaster")
    });

    it("It should return the error if someone tries to verify the verified fid", async function () {
    const {owner, worldIdMock, worldVerifier} = await loadFixture(deployFixture)
    await worldVerifier.verify(
        1234,
        123,
        23232,
        [1, 2, 3, 4, 5 , 6, 7 ,8]
    )


    await expect(worldVerifier.verify(
        1234,
        123,
        1123,
        [1, 2, 3, 4, 5 , 6, 7 ,8]
    )).to.be
        .revertedWith("WorldCoinVerification: Provided FID was already verified")
});

  });
});