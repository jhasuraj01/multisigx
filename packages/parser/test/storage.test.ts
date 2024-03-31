// Right click on the script name and hit "Run" to execute
import { expect, describe, test} from 'vitest';
import { ethers, network,  } from 'hardhat';

describe('Ballot', function () {
  test('test initial value', async function () {
    const Storage = await ethers.getContractFactory('Storage')
    const storage = await Storage.deploy()
    await storage.deployed()
    console.log('storage deployed at:' + storage.address)
    expect((await storage.retrieve()).toNumber()).to.equal(0)
  }, 31*1000)
  test('test updating and retrieving updated value', async function () {
    const Storage = await ethers.getContractFactory('Storage')
    const storage = await Storage.deploy()
    await storage.deployed()
    const storage2 = await ethers.getContractAt('Storage', storage.address)
    const setValue = await storage2.store(56)
    await setValue.wait()
    expect((await storage2.retrieve()).toNumber()).to.equal(56)
  }, 31*1000)
});
