const hre = require("hardhat");

async function main() {
  // Dirección del contrato desplegado
  const CONTRACT_ADDRESS = "0x8bbba4b076916BFE4dCC19aDc797F2682E8DFd08";
  
  // Lista de direcciones que recibirán tokens
  const addresses = [
    "0xa1fd4046c3f6f88943811a44DFBDc4A65A2726f7",
    "0x71Cd2540396F5893d5615509bE72b9CfAF380978",
    "0x9838d96373cdf1be12b289483c497111eb782ef7",
    "0xf78234818973A54244278A62DA6C91Ae1dc067A6",
    "0x99f97872cdA51Ad2d5B2f578624A19eb7a04Dbc0",
    "0x9fee1ca9d14be2d4321d2eb58672a9ee8c397793",
    "0xF87a916B28bEDa9e90bf944BE59879eA286740ab",
    "0xe98c540b27ae395187f0ecf8f07291a3b9cbb047",
    "0x1d0Dff6Bbf22f6892FcA59f46eAF18AB8F27261A",
    "0xC7D810579DEE527807Fb63FEB60a5E09C9A9c219",
    "0x9e7c7170135d680e97bd1b3d95230f1e6e56e331",
    "0x7B214a3Be8aB5f1326F08983B394085f4457E4d2",
    "0x7FbEdd8680bFe54F4E276B9Cf7E4d033DE696d1b",
    "0x1E147BFcb45499A1bb4Ab738107108eD792347c8"
  ];

  // Cantidad a transferir a cada dirección (100,000 BTRD)
  const transferAmount = hre.ethers.parseEther("100000");

  // Obtener el contrato
  const BitxelRoadsToken = await hre.ethers.getContractFactory("BitxelRoadsToken");
  const token = await BitxelRoadsToken.attach(CONTRACT_ADDRESS);

  console.log("Iniciando transferencias en lote...");
  console.log(`Cantidad por dirección: 100,000 BTRD`);
  console.log(`Total a transferir: ${100000 * addresses.length} BTRD`);
  console.log("----------------------------------------");

  // Realizar transferencias
  for (let i = 0; i < addresses.length; i++) {
    try {
      console.log(`[${i + 1}/${addresses.length}] Transfiriendo a ${addresses[i]}...`);
      const tx = await token.transfer(addresses[i], transferAmount);
      await tx.wait(); // Esperar a que la transacción se confirme
      console.log(`✅ Transferencia completada. Hash: ${tx.hash}`);
    } catch (error) {
      console.error(`❌ Error al transferir a ${addresses[i]}:`, error.message);
    }
    console.log("----------------------------------------");
  }

  // Verificar balances después de las transferencias
  console.log("\nVerificando balances finales:");
  for (let i = 0; i < addresses.length; i++) {
    const balance = await token.balanceOf(addresses[i]);
    console.log(`${addresses[i]}: ${hre.ethers.formatEther(balance)} BTRD`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });