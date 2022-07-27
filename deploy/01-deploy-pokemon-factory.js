const { network, ethers } = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    let subscriptionId;

    //solo //rinkeby
    if (!developmentChains.includes(network.name)) {
        subscriptionId = networkConfig[chainId]["subscriptionId"]; //<-----
    }

    const gasLane = networkConfig[chainId]["gasLane"];
    const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"];
    const interval = networkConfig[chainId]["interval"];

    const args = [];

    const pokemonFactory = await deploy("PokemonFactory", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(pokemonFactory.address, args);
    }

    log("-----------------------------------------------");
};

module.exports.tags = ["all", "pokemonfactory"];
