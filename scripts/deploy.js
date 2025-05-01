const hre = require("hardhat");

async function main() {
  console.log("Deploying Community Funding Contract...");

  // Deploy the CommunityFunding contract
  const CommunityFunding = await hre.ethers.getContractFactory("CommunityFunding");
  const communityFunding = await CommunityFunding.deploy();

  await communityFunding.waitForDeployment();

  const address = await communityFunding.getAddress();
  console.log(`CommunityFunding deployed to: ${address}`);
  
  console.log("Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });