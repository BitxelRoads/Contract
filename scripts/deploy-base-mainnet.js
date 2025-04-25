const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment to Base mainnet...");
  
  // Get the deployer's address
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}`);
  
  // Configure gas settings for EIP-1559
  const baseFee = hre.ethers.parseUnits("0.0042", "gwei");
  const priorityFee = hre.ethers.parseUnits("0.0001", "gwei");
  
  console.log(`Using base fee: ${hre.ethers.formatUnits(baseFee, "gwei")} Gwei`);
  console.log(`Using priority fee: ${hre.ethers.formatUnits(priorityFee, "gwei")} Gwei`);

  // Deploy the token with EIP-1559 gas settings
  const BitxelRoadsToken = await hre.ethers.getContractFactory("BitxelRoadsToken");
  const token = await BitxelRoadsToken.deploy(
    deployer.address,
    {
      maxFeePerGas: baseFee,
      maxPriorityFeePerGas: priorityFee
    }
  );
  
  await token.waitForDeployment();
  
  const deployedAddress = await token.getAddress();
  console.log(`BitxelRoadsToken deployed to: ${deployedAddress}`);
  
  // Wait for 5 confirmations
  console.log("Waiting for confirmations...");
  await token.deploymentTransaction().wait(5);
  
  // Save deployment info
  const deploymentInfo = {
    tokenAddress: deployedAddress,
    deployer: deployer.address,
    baseFee: hre.ethers.formatUnits(baseFee, "gwei"),
    priorityFee: hre.ethers.formatUnits(priorityFee, "gwei"),
    network: "base-mainnet",
    timestamp: new Date().toISOString()
  };

  // Save to deployment summary
  const fs = require("fs");
  fs.writeFileSync(
    "Deployment Summary.txt",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  // Verify the contract
  console.log("Verifying contract on Basescan...");
  try {
    await hre.run("verify:verify", {
      address: deployedAddress,
      constructorArguments: [deployer.address],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 