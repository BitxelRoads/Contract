const hre = require("hardhat");

async function main() {
  // Dirección del contrato desplegado
  const CONTRACT_ADDRESS = "0x8bbba4b076916BFE4dCC19aDc797F2682E8DFd08";
  
  // Obtener el contrato
  const BitxelRoadsToken = await hre.ethers.getContractFactory("BitxelRoadsToken");
  const token = await BitxelRoadsToken.attach(CONTRACT_ADDRESS);

  try {
    // Obtener el owner actual
    const currentOwner = await token.owner();
    
    // Obtener la dirección que está ejecutando el script
    const [signer] = await hre.ethers.getSigners();
    const signerAddress = await signer.getAddress();

    console.log("\nInformación de Ownership:");
    console.log("----------------------------------------");
    console.log(`Owner actual: ${currentOwner}`);
    console.log(`Tu dirección: ${signerAddress}`);
    console.log(`¿Eres el owner?: ${currentOwner.toLowerCase() === signerAddress.toLowerCase() ? 'Sí ✅' : 'No ❌'}`);
    
  } catch (error) {
    console.error("❌ Error al verificar ownership:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 