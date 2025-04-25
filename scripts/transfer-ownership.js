const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🔐 Iniciando transferencia de ownership a Trezor...");
  
  const TREZOR_ADDRESS = "0x64Ed97E6b5b35A6F0c8A3C4eE619af801600181A";
  
  // Configure gas settings for EIP-1559
  const baseFee = hre.ethers.parseUnits("0.0042", "gwei");
  const priorityFee = hre.ethers.parseUnits("0.0001", "gwei");
  
  console.log(`Using base fee: ${hre.ethers.formatUnits(baseFee, "gwei")} Gwei`);
  console.log(`Using priority fee: ${hre.ethers.formatUnits(priorityFee, "gwei")} Gwei`);

  // Get the contract instance
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Ejecutando desde la cuenta: ${deployer.address}`);

  // Get deployment info to find contract address
  const deploymentSummaryPath = path.join(__dirname, '..', 'Deployment Summary.txt');
  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentSummaryPath, 'utf8'));
  const contractAddress = "0xafa8dA93d77E64D7a8275EBaD623c7ED9430B40D"; // Dirección del contrato desplegado
  
  console.log(`Contrato objetivo: ${contractAddress}`);
  
  const BitxelRoadsToken = await hre.ethers.getContractFactory("BitxelRoadsToken");
  const token = await BitxelRoadsToken.attach(contractAddress);

  console.log(`Conectado al contrato en: ${contractAddress}`);
  
  // Transfer ownership
  console.log(`Transfiriendo ownership a: ${TREZOR_ADDRESS}`);
  
  const tx = await token.transferOwnership(TREZOR_ADDRESS, {
    maxFeePerGas: baseFee,
    maxPriorityFeePerGas: priorityFee
  });

  console.log("Esperando confirmaciones...");
  await tx.wait(5); // Esperar 5 confirmaciones

  console.log("✅ Ownership transferido exitosamente!");
  console.log("Por favor, verifica en Basescan que el nuevo owner es tu dirección de Trezor.");
  console.log("URL para verificar:", `https://basescan.org/address/${contractAddress}#readContract`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  }); 