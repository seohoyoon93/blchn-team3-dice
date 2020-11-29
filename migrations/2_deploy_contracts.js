var RollDice = artifacts.require("./RollDice.sol");

module.exports = function (deployer) {
  deployer.deploy(RollDice);
};
