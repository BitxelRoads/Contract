const hre = require("hardhat");

async function main() {
  // Dirección del contrato desplegado
  const CONTRACT_ADDRESS = "0x8bbba4b076916BFE4dCC19aDc797F2682E8DFd08";
  // Nueva dirección del owner
  const NEW_OWNER = "0x64Ed97E6b5b35A6F0c8A3C4eE619af801600181A";
  
  // Obtener el contrato
  const BitxelRoadsToken = await hre.ethers.getContractFactory("BitxelRoadsToken");
  const token = await BitxelRoadsToken.attach(CONTRACT_ADDRESS);

  console.log("Iniciando transferencia de ownership...");
  console.log(`Dirección del nuevo owner: ${NEW_OWNER}`);
  
  try {
    // Transferir ownership
    const tx = await token.transferOwnership(NEW_OWNER);
    await tx.wait(); // Esperar a que la transacción se confirme
    
    console.log(`✅ Ownership transferido exitosamente`);
    console.log(`Hash de la transacción: ${tx.hash}`);
    
    // Verificar el nuevo owner
    const newOwner = await token.owner();
    console.log(`\nVerificación:`);
    console.log(`Nuevo owner: ${newOwner}`);
    console.log(`¿Transferencia exitosa?: ${newOwner.toLowerCase() === NEW_OWNER.toLowerCase() ? 'Sí ✅' : 'No ❌'}`);
    
  } catch (error) {
    console.error("❌ Error al transferir ownership:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 