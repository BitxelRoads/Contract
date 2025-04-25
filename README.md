# 🎮 Bitxel Roads Smart Contracts

## Overview
Bitxel Roads is a blockchain-based racing game that combines traditional gaming mechanics with Web3 technology. This repository contains all the smart contracts that power the Bitxel Roads ecosystem.

## 🏗 Contract Architecture

### Core Contracts
1. **BitxelRoadsToken (BTRD)**
   - ERC20 token implementation
   - Total Supply: 1,000,000,000 BTRD
   - Features: Pausable, Burnable
   - Network: Base (Coinbase L2)

2. **BitxelRoadsCollection (NFTs)**
   - ERC721 implementation for game assets
   - Features: Dynamic metadata
   - Supports: Cars, Tracks, and Special Items

3. **BitxelRoadsGame**
   - Core game mechanics
   - Race management
   - Tournament system

4. **BitxelRoadsRewards**
   - Reward distribution system
   - Staking mechanics
   - Tournament prize pools

## 🔧 Technical Stack
- Solidity ^0.8.20
- OpenZeppelin Contracts
- Hardhat Development Environment
- Base Network (L2 Scaling Solution)

## 🚀 Deployment Information

### Base Sepolia (Testnet)
- BitxelRoadsToken: `0x8bbba4b076916BFE4dCC19aDc797F2682E8DFd08`
- Owner: `0x64Ed97E6b5b35A6F0c8A3C4eE619af801600181A`

### Base Mainnet
- Contracts pending deployment

## 🔐 Security Features
- Ownable pattern implementation
- Pausable mechanisms for emergency stops
- Role-based access control
- Thoroughly tested and audited

## 🛠 Development Setup

1. Clone the repository
```bash
git clone https://github.com/BitxelRoads/Contract.git
```

2. Install dependencies
```bash
npm install
```

3. Configure environment
```bash
cp .env.example .env
# Add your private key and API endpoints
```

4. Run tests
```bash
npx hardhat test
```

## 📜 License
All rights reserved. The code in this repository is proprietary and confidential.

## 🤝 Contributing
Currently, this is a private repository. Contributions are by invitation only.

## 🔗 Links
- [Website](https://bitxelroads.com)
- [Documentation](https://bitxel-roads-trading-cards.gitbook.io/bitxel-roads-trading-cards/collection-concept)
- [Twitter](https://twitter.com/BitxelRoads)

## 📞 Contact
For any queries regarding the smart contracts, please reach out to the development team through official channels.
