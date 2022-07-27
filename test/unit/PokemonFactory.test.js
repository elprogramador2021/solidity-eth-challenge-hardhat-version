const { assert, expect } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Pokemon Factory Tests", async function () {
          let pokemonFactory, deployer, interval;
          const chainId = network.config.chainId;

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer;
              pokemonFactory = await ethers.getContract("PokemonFactory", deployer);
          });

          //TESTS
      });
