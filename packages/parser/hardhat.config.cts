// import { HardhatUserConfig } from "hardhat/config";
require("@nomicfoundation/hardhat-toolbox-viem");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// const { API_URL, PRIVATE_KEY } = process.env;

const config = {
  solidity: "0.8.24",

  defaultNetwork: "hardhat",

  // networks: {
  //   sepolia : {
  //     url: API_URL,
  //     accounts: [`0x${PRIVATE_KEY}`]
  //   }
  // }
};

module.exports = config;
