// Script to deploy the contract to Sepolia testnet
const hre = require("hardhat");

async function main() {
  console.log("Deploying contract to Sepolia testnet...");

  // Get the contract factory
  const CommunityFunding = await hre.ethers.getContractFactory("CommunityFunding");

  // Deploy the contract
  const communityFunding = await CommunityFunding.deploy();

  // Wait for deployment to finish
  await communityFunding.waitForDeployment();

  // Get the contract address
  const contractAddress = await communityFunding.getAddress();

  console.log(`CommunityFunding deployed to: ${contractAddress}`);
  console.log("Add this address to your .env file as VITE_CONTRACT_ADDRESS");

  // Wait for a few block confirmations to make sure the contract is properly deployed
  console.log("Waiting for block confirmations...");
  await communityFunding.deploymentTransaction().wait(5);

  // Verify the contract on Etherscan if we have an API key
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified on Etherscan!");
    } catch (error) {
      console.error("Error verifying contract:", error);
    }
  }
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
