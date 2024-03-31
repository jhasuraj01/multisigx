import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'

async function main(): Promise<void>{
  const Contract = await ethers.getContractFactory('GraphContract')
  const deployed = await Contract.deploy()
  console.log(deployed)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
