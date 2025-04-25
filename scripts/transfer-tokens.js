const hre = require("hardhat");

async function main() {
  console.log("💎 Iniciando transferencia de tokens a Trezor...");
  
  const TREZOR_ADDRESS = "0x64Ed97E6b5b35A6F0c8A3C4eE619af801600181A";
  const CONTRACT_ADDRESS = "0xafa8dA93d77E64D7a8275EBaD623c7ED9430B40D";
  
  // Configure gas settings for EIP-1559
  const baseFee = hre.ethers.parseUnits("0.0042", "gwei");
  const priorityFee = hre.ethers.parseUnits("0.0001", "gwei");
  
  console.log(`Using base fee: ${hre.ethers.formatUnits(baseFee, "gwei")} Gwei`);
  console.log(`Using priority fee: ${hre.ethers.formatUnits(priorityFee, "gwei")} Gwei`);

  // Get the contract instance
  const [sender] = await hre.ethers.getSigners();
  console.log(`Enviando desde la cuenta: ${sender.address}`);
  
  const BitxelRoadsToken = await hre.ethers.getContractFactory("BitxelRoadsToken");
  const token = await BitxelRoadsToken.attach(CONTRACT_ADDRESS);

  // Get current balance
  const balance = await token.balanceOf(sender.address);
  console.log(`Balance actual: ${hre.ethers.formatUnits(balance, 18)} BTRD`);
  
  console.log(`Transfiriendo tokens a: ${TREZOR_ADDRESS}`);
  
  // Transfer all tokens
  const tx = await token.transfer(TREZOR_ADDRESS, balance, {
    maxFeePerGas: baseFee,
    maxPriorityFeePerGas: priorityFee
  });

  console.log("Esperando confirmaciones...");
  await tx.wait(5); // Esperar 5 confirmaciones

  // Verify final balance
  const finalBalance = await token.balanceOf(TREZOR_ADDRESS);
  console.log(`✅ Transferencia completada!`);
  console.log(`Balance final en Trezor: ${hre.ethers.formatUnits(finalBalance, 18)} BTRD`);
  console.log("URL para verificar:", `https://basescan.org/token/${CONTRACT_ADDRESS}?a=${TREZOR_ADDRESS}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  }); 